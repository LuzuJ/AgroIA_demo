import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a plant image or description to identify diseases.
 */
export const analyzePlantHealth = async (
  description: string,
  imageBase64?: string
): Promise<DiagnosisResult> => {
  
  const prompt = `
    Actúa como un agrónomo experto con especialización en fitopatología.
    Analiza la siguiente entrada (descripción de texto y/o imagen de una planta).
    Identifica posibles enfermedades, plagas o deficiencias nutricionales.
    
    Proporciona la salida estrictamente en formato JSON con los siguientes campos:
    - diseaseName: Nombre común de la enfermedad o problema.
    - confidence: Nivel de confianza (Alto, Medio, Bajo).
    - description: Breve descripción del problema detectado.
    - treatment: Pasos recomendados para curar la planta (orgánicos y químicos).
    - preventativeMeasures: Lista de acciones para prevenir esto en el futuro.

    Si la entrada no parece relacionada con plantas, indica "No se detectó planta" en diseaseName.
    Descripción del usuario: ${description}
  `;

  try {
    let response;

    const schema = {
      type: Type.OBJECT,
      properties: {
        diseaseName: { type: Type.STRING },
        confidence: { type: Type.STRING },
        description: { type: Type.STRING },
        treatment: { type: Type.STRING },
        preventativeMeasures: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["diseaseName", "confidence", "description", "treatment", "preventativeMeasures"]
    };

    if (imageBase64) {
      // Use vision model if image is present
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg', // Assuming jpeg for simplicity, widely compatible
                data: imageBase64
              }
            },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });
    } else {
      // Use text model
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });
    }

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as DiagnosisResult;

  } catch (error) {
    console.error("Error diagnosing plant:", error);
    throw new Error("No se pudo realizar el diagnóstico. Intenta nuevamente.");
  }
};
