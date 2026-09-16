import { IProductRepository } from './IProductRepository';
import { Product } from '../models';
import { dbManager } from '../database/DatabaseManager';

export class ProductRepository implements IProductRepository {
  private readonly storeName = 'products';

  async getAll(): Promise<Product[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const products = request.result.map((data: any) => Product.fromJSON(data));
        resolve(products);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<Product | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? Product.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async create(product: Product): Promise<Product> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(product.toJSON());

      request.onsuccess = () => resolve(product);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = Object.assign(existing, productData);
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

  async getByCategory(category: string): Promise<Product[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('category');
      const request = index.getAll(category);

      request.onsuccess = () => {
        const products = request.result.map((data: any) => Product.fromJSON(data));
        resolve(products);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getBySeller(sellerId: string): Promise<Product[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('sellerId');
      const request = index.getAll(sellerId);

      request.onsuccess = () => {
        const products = request.result.map((data: any) => Product.fromJSON(data));
        resolve(products);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAvailable(): Promise<Product[]> {
    const allProducts = await this.getAll();
    return allProducts.filter(product => product.isAvailable());
  }

  async searchByName(query: string): Promise<Product[]> {
    const allProducts = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }
}
