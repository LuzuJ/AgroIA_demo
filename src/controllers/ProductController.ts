import { Product } from '../models';
import { IProductRepository } from '../repositories/IProductRepository';

export class ProductController {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.getAll();
    } catch (error) {
      console.error('Error getting all products:', error);
      return [];
    }
  }

  async getAvailableProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.getAvailable();
    } catch (error) {
      console.error('Error getting available products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      return await this.productRepository.getById(id);
    } catch (error) {
      console.error(`Error getting product ${id}:`, error);
      return null;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      return await this.productRepository.getByCategory(category);
    } catch (error) {
      console.error(`Error getting products by category ${category}:`, error);
      return [];
    }
  }

  async getProductsBySeller(sellerId: string): Promise<Product[]> {
    try {
      return await this.productRepository.getBySeller(sellerId);
    } catch (error) {
      console.error(`Error getting products by seller ${sellerId}:`, error);
      return [];
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      return await this.productRepository.searchByName(query);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  async createProduct(productData: {
    name: string;
    price: number;
    currency: string;
    description: string;
    category: any;
    image: string;
    sellerId: string;
    seller: string;
    stock?: number;
  }): Promise<Product> {
    try {
      const newProduct = new Product(
        crypto.randomUUID(),
        productData.name,
        productData.price,
        productData.currency,
        productData.description,
        productData.category,
        productData.image,
        productData.sellerId,
        productData.seller,
        productData.stock || 0
      );
      return await this.productRepository.create(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
    try {
      return await this.productRepository.update(id, productData);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      return false;
    }
  }
}
