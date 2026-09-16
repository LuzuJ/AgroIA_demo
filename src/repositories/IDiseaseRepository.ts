import { IRepository } from './IRepository';
import { Disease } from '../models';

export interface IDiseaseRepository extends IRepository<Disease> {
  searchBySymptoms(symptoms: string[]): Promise<Disease[]>;
  getByPlant(plantName: string): Promise<Disease[]>;
  searchByName(query: string): Promise<Disease[]>;
}
