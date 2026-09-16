import { useState } from 'react';
import { DiagnosisController } from '../controllers/DiagnosisController';
import { DiagnosisResult } from '../../types';

const diagnosisController = new DiagnosisController();

export function useDiagnosis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const diagnose = async (description: string, imageBase64?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const diagnosis = await diagnosisController.diagnose(description, imageBase64);
      setResult(diagnosis);
      return diagnosis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  const isConfigured = diagnosisController.isConfigured();
  const setupInstructions = diagnosisController.getSetupInstructions();

  return {
    loading,
    result,
    error,
    diagnose,
    reset,
    isConfigured,
    setupInstructions,
  };
}
