/**
 * IndexedDB Database Manager
 * Handles connection and initialization of IndexedDB
 */
export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'AgriConnectDB';
  private readonly DB_VERSION = 2;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async initialize(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
          userStore.createIndex('role', 'role', { unique: false });
        }

        if (!db.objectStoreNames.contains('posts')) {
          const postStore = db.createObjectStore('posts', { keyPath: 'id' });
          postStore.createIndex('userId', 'userId', { unique: false });
          postStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('comments')) {
          const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
          commentStore.createIndex('postId', 'postId', { unique: false });
          commentStore.createIndex('userId', 'userId', { unique: false });
          commentStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id' });
          productStore.createIndex('category', 'category', { unique: false });
          productStore.createIndex('sellerId', 'sellerId', { unique: false });
        }

        if (!db.objectStoreNames.contains('diseases')) {
          const diseaseStore = db.createObjectStore('diseases', { keyPath: 'id' });
          diseaseStore.createIndex('name', 'name', { unique: false });
        }

        if (!db.objectStoreNames.contains('groups')) {
          const groupStore = db.createObjectStore('groups', { keyPath: 'id' });
          groupStore.createIndex('isJoined', 'isJoined', { unique: false });
        }
      };
    });
  }

  async getDatabase(): Promise<IDBDatabase> {
    if (!this.db) {
      return this.initialize();
    }
    return this.db;
  }

  async clearAllData(): Promise<void> {
    const db = await this.getDatabase();
    const storeNames = Array.from(db.objectStoreNames);
    
    const transaction = db.transaction(storeNames, 'readwrite');
    
    for (const storeName of storeNames) {
      const store = transaction.objectStore(storeName);
      store.clear();
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const dbManager = DatabaseManager.getInstance();
