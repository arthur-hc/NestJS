import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(products: Product[]) {
    this.products = products;
  }

  @Get()
  getAllProducts(): Product[] {
    return this.products;
  }

  @Get('/:id')
  getProductById(@Param() params): Product {
    console.log(params);
    return this.products[0];
  }

  @Post()
  createProduct(@Body() product): Product[] {
    const newProduct = new Product(product.code, product.name, product.price);
    newProduct.id = 123;
    this.products.push(newProduct);
    return this.products;
  }

  @Put('/:id')
  updateProduct(@Param() params, @Body() product): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === Number(params.id),
    );
    this.products[productIndex] = product;
    this.products[productIndex].id = params.id;
    return this.products[productIndex];
  }

  @Delete('/:id')
  deleteProduct(@Param() params): Product[] {
    this.products = this.products.filter(
      (product) => product.id !== Number(params.id),
    );
    return this.products;
  }
}
