import { analyzePlantHealth } from '../../services/geminiService';
import { DiagnosisResult } from '../../types';

/**
 * Diagnosis Controller
 * Handles plant disease diagnosis using AI
 */
export class DiagnosisController {
  /**
   * Analyze plant health using description and/or image
   * @param description - Text description of the problem
   * @param imageBase64 - Base64 encoded image (without data URL prefix)
   * @returns Diagnosis result from AI
   */
  async diagnose(description: string, imageBase64?: string): Promise<DiagnosisResult> {
    try {
      if (!description && !imageBase64) {
        throw new Error('Se requiere una descripción o imagen para realizar el diagnóstico');
      }

      const result = await analyzePlantHealth(description, imageBase64);
      
      // Validate result
      if (!result.diseaseName) {
        throw new Error('El diagnóstico no retornó resultados válidos');
      }

      return result;
    } catch (error) {
      console.error('Error in diagnosis:', error);
      
      // Return user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('API Key')) {
          throw new Error('⚠️ La API de Gemini no está configurada. Por favor agrega tu API key en el archivo .env');
        }
        throw error;
      }
      
      throw new Error('No se pudo completar el diagnóstico. Por favor intenta nuevamente.');
    }
  }

  /**
   * Check if Gemini API is configured
   * @returns true if API key is set
   */
  isConfigured(): boolean {
    return !!import.meta.env.VITE_GEMINI_API_KEY;
  }

  /**
   * Get instructions for configuring the API
   * @returns Setup instructions
   */
  getSetupInstructions(): string {
    return `
Para usar el diagnóstico de IA:

1. Obtén una API key gratis en: https://makersuite.google.com/app/apikey
2. Crea o edita el archivo .env en la raíz del proyecto
3. Agrega: VITE_GEMINI_API_KEY=tu_api_key_aqui
4. Reinicia el servidor de desarrollo (npm run dev)

El plan gratis de Gemini incluye:
- 60 requests por minuto
- 1500 requests por día
- ¡Completamente gratis!
    `.trim();
  }
}
