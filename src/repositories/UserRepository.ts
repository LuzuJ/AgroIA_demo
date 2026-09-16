import { IUserRepository } from './IUserRepository';
import { User } from '../models';
import { dbManager } from '../database/DatabaseManager';

export class UserRepository implements IUserRepository {
  private readonly storeName = 'users';

  async getAll(): Promise<User[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const users = request.result.map((data: any) => User.fromJSON(data));
        resolve(users);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<User | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? User.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async create(user: User): Promise<User> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(user.toJSON());

      request.onsuccess = () => resolve(user);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = Object.assign(existing, userData);
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

  async getByEmail(email: string): Promise<User | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('email');
      const request = index.get(email);

      request.onsuccess = () => {
        resolve(request.result ? User.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('role');
      const request = index.getAll(role);

      request.onsuccess = () => {
        const users = request.result.map((data: any) => User.fromJSON(data));
        resolve(users);
      };
      request.onerror = () => reject(request.error);
    });
  }
}
