import { IGroupRepository } from './IGroupRepository';
import { Group } from '../models';
import { dbManager } from '../database/DatabaseManager';

export class GroupRepository implements IGroupRepository {
  private readonly storeName = 'groups';

  async getAll(): Promise<Group[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const groups = request.result.map((data: any) => Group.fromJSON(data));
        resolve(groups);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<Group | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? Group.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async create(group: Group): Promise<Group> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(group.toJSON());

      request.onsuccess = () => resolve(group);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, groupData: Partial<Group>): Promise<Group | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = Object.assign(existing, groupData);
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

  async getJoinedGroups(): Promise<Group[]> {
    const allGroups = await this.getAll();
    return allGroups.filter(group => group.isJoined);
  }

  async toggleJoin(groupId: string): Promise<Group | null> {
    const group = await this.getById(groupId);
    if (!group) return null;

    if (group.isJoined) {
      group.leave();
    } else {
      group.join();
    }

    return this.update(groupId, group);
  }

  async searchByName(query: string): Promise<Group[]> {
    const allGroups = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return allGroups.filter(group =>
      group.name.toLowerCase().includes(lowerQuery)
    );
  }
}
