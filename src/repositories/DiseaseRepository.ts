import { IDiseaseRepository } from './IDiseaseRepository';
import { Disease } from '../models';
import { dbManager } from '../database/DatabaseManager';

export class DiseaseRepository implements IDiseaseRepository {
  private readonly storeName = 'diseases';

  async getAll(): Promise<Disease[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const diseases = request.result.map((data: any) => Disease.fromJSON(data));
        resolve(diseases);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<Disease | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? Disease.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async create(disease: Disease): Promise<Disease> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(disease.toJSON());

      request.onsuccess = () => resolve(disease);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, diseaseData: Partial<Disease>): Promise<Disease | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = Object.assign(existing, diseaseData);
    const db = await dbManager.getDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(updated.toJSON());

      request.onsuccess = () => resolve(updated);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id: string): Promise<boolean> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async searchBySymptoms(symptoms: string[]): Promise<Disease[]> {
    const allDiseases = await this.getAll();
    return allDiseases.filter(disease =>
      symptoms.some(symptom =>
        disease.symptoms.some(s =>
          s.toLowerCase().includes(symptom.toLowerCase())
        )
      )
    );
  }

  async getByPlant(plantName: string): Promise<Disease[]> {
    const allDiseases = await this.getAll();
    return allDiseases.filter(disease => disease.affectsPlant(plantName));
  }

  async searchByName(query: string): Promise<Disease[]> {
    const allDiseases = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return allDiseases.filter(disease =>
      disease.name.toLowerCase().includes(lowerQuery) ||
      disease.scientificName.toLowerCase().includes(lowerQuery)
    );
  }
}
