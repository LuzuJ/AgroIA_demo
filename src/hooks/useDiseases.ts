import { useState, useEffect } from 'react';
import { container } from '../config';
import { Disease } from '../models';

export function useDiseases() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDiseases = async () => {
    try {
      setLoading(true);
      const data = await container.diseaseController.getAllDiseases();
      setDiseases(data);
      setError(null);
    } catch (err) {
      setError('Error loading diseases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiseases();
  }, []);

  const searchByPlant = async (plantName: string) => {
    try {
      setLoading(true);
      const data = await container.diseaseController.getDiseasesByPlant(plantName);
      setDiseases(data);
    } catch (err) {
      console.error('Error searching diseases:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async (query: string) => {
    try {
      setLoading(true);
      const data = await container.diseaseController.searchDiseases(query);
      setDiseases(data);
    } catch (err) {
      console.error('Error searching diseases:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    diseases,
    loading,
    error,
    searchByPlant,
    searchByName,
    refresh: loadDiseases,
  };
}
