import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  async createProduct(product: Product) {
    this.products.push(product);
    return product;
  }

  async getAllProducts() {
    return this.products;
  }

  async getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }

  async updateProduct(id: string, updateData: Partial<Product>) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updateData };
      return this.products[index];
    }
    return null;
  }

  async deleteProduct(id: string) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1);
    }
    return null;
  }
}
