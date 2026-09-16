import { Disease } from '../models';
import { IDiseaseRepository } from '../repositories/IDiseaseRepository';

export class DiseaseController {
  constructor(private diseaseRepository: IDiseaseRepository) {}

  async getAllDiseases(): Promise<Disease[]> {
    try {
      return await this.diseaseRepository.getAll();
    } catch (error) {
      console.error('Error getting all diseases:', error);
      return [];
    }
  }

  async getDiseaseById(id: string): Promise<Disease | null> {
    try {
      return await this.diseaseRepository.getById(id);
    } catch (error) {
      console.error(`Error getting disease ${id}:`, error);
      return null;
    }
  }

  async searchDiseases(query: string): Promise<Disease[]> {
    try {
      return await this.diseaseRepository.searchByName(query);
    } catch (error) {
      console.error('Error searching diseases:', error);
      return [];
    }
  }

  async getDiseasesByPlant(plantName: string): Promise<Disease[]> {
    try {
      return await this.diseaseRepository.getByPlant(plantName);
    } catch (error) {
      console.error(`Error getting diseases by plant ${plantName}:`, error);
      return [];
    }
  }

  async searchBySymptoms(symptoms: string[]): Promise<Disease[]> {
    try {
      return await this.diseaseRepository.searchBySymptoms(symptoms);
    } catch (error) {
      console.error('Error searching diseases by symptoms:', error);
      return [];
    }
  }

  async createDisease(diseaseData: {
    name: string;
    scientificName: string;
    symptoms: string[];
    treatment: string;
    plants: string[];
    image: string;
    preventativeMeasures?: string[];
    severity?: 'Baja' | 'Media' | 'Alta';
  }): Promise<Disease> {
    try {
      const newDisease = new Disease(
        crypto.randomUUID(),
        diseaseData.name,
        diseaseData.scientificName,
        diseaseData.symptoms,
        diseaseData.treatment,
        diseaseData.plants,
        diseaseData.image,
        diseaseData.preventativeMeasures,
        diseaseData.severity
      );
      return await this.diseaseRepository.create(newDisease);
    } catch (error) {
      console.error('Error creating disease:', error);
      throw new Error('Failed to create disease');
    }
  }

  async updateDisease(id: string, diseaseData: Partial<Disease>): Promise<Disease | null> {
    try {
      return await this.diseaseRepository.update(id, diseaseData);
    } catch (error) {
      console.error(`Error updating disease ${id}:`, error);
      return null;
    }
  }

  async deleteDisease(id: string): Promise<boolean> {
    try {
      return await this.diseaseRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting disease ${id}:`, error);
      return false;
    }
  }
}
