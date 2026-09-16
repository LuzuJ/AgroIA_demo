import { IRepository } from './IRepository';
import { Product } from '../models';

export interface IProductRepository extends IRepository<Product> {
  getByCategory(category: string): Promise<Product[]>;
  getBySeller(sellerId: string): Promise<Product[]>;
  getAvailable(): Promise<Product[]>;
  searchByName(query: string): Promise<Product[]>;
}
