export type ProductCategory = 'Semillas' | 'Fertilizantes' | 'Herramientas' | 'Equipos' | 'Otro';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public currency: string,
    public description: string,
    public category: ProductCategory,
    public image: string,
    public sellerId: string,
    public seller: string,
    public stock: number = 0,
    public createdAt: Date = new Date()
  ) {}

  static fromJSON(json: any): Product {
    return new Product(
      json.id,
      json.name,
      json.price,
      json.currency,
      json.description,
      json.category,
      json.image,
      json.sellerId,
      json.seller,
      json.stock || 0,
      json.createdAt ? new Date(json.createdAt) : new Date()
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      currency: this.currency,
      description: this.description,
      category: this.category,
      image: this.image,
      sellerId: this.sellerId,
      seller: this.seller,
      stock: this.stock,
      createdAt: this.createdAt.toISOString()
    };
  }

  isAvailable(): boolean {
    return this.stock > 0;
  }

  decreaseStock(quantity: number = 1): void {
    if (this.stock >= quantity) {
      this.stock -= quantity;
    }
  }
}
