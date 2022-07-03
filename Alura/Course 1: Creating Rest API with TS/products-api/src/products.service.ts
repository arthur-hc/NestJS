import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products) private productsModel: typeof Products) {}

  async getAllProducts(): Promise<Products[]> {
    return await this.productsModel.findAll();
  }

  async getProductById(productId: number): Promise<Products> {
    return await this.productsModel.findByPk(productId);
  }

  async createProduct(product: Products): Promise<Products> {
    return await this.productsModel.create(product);
  }

  async updateProduct(productId: number, product: Products): Promise<[number]> {
    return await this.productsModel.update(product, {
      where: { id: productId },
    });
  }

  deleteProduct(id: number): Promise<number> {
    return this.productsModel.destroy({ where: { id } });
  }
}
