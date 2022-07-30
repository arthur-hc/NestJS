import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Products } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Products[]> {
    return await this.productsService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param() params): Promise<Products> {
    return await this.productsService.getProductById(params.id);
  }

  @Post()
  async createProduct(@Body() product): Promise<Products> {
    return await this.productsService.createProduct(product);
  }

  @Put('/:id')
  async updateProduct(@Param() params, @Body() product): Promise<[number]> {
    return await this.productsService.updateProduct(Number(params.id), product);
  }

  @Delete('/:id')
  async deleteProduct(@Param() params): Promise<number> {
    return await this.productsService.deleteProduct(params.id);
  }
}
