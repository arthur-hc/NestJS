import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(private product: Product) {}
  products: Product[] = [];

  async getAllProducts(): Promise<Product> {
    return await this.product.get();
  }

  getProductById(productId: number): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    return this.products[productIndex] || null;
  }

  createProduct(product: Product): Product[] {
    // const newProduct = new Product(product.code, product.name, product.price);
    // newProduct.id = 123;
    // this.products.push(newProduct);
    return this.products;
  }

  updateProduct(productId: number, product: Product): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    product.id = productId;
    this.products[productIndex] = product;
    return this.products[productIndex];
  }

  deleteProduct(id: number): Product[] {
    this.products = this.products.filter(
      (product) => product.id !== Number(id),
    );
    return this.products;
  }
}
