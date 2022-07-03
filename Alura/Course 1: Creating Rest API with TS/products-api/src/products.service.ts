import { Product } from './product.model';

export class ProductsService {
  products: Product[] = [];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(): Product {
    return this.products[0];
  }

  createProduct(product: Product): Product[] {
    const newProduct = new Product(product.code, product.name, product.price);
    newProduct.id = 123;
    this.products.push(newProduct);
    return this.products;
  }

  updateProduct(product: Product): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === Number(product.id),
    );
    this.products[productIndex] = product;
    this.products[productIndex].id = product.id;
    return this.products[productIndex];
  }

  deleteProduct(id: number): Product[] {
    this.products = this.products.filter(
      (product) => product.id !== Number(id),
    );
    return this.products;
  }
}
