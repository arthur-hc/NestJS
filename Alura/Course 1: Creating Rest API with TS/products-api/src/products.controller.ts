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
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param() params): Product {
    return this.productsService.getProductById(Number(params.id)) || null;
  }

  @Post()
  createProduct(@Body() product): Product[] {
    return this.productsService.createProduct(product);
  }

  @Put('/:id')
  updateProduct(@Param() params, @Body() product): Product {
    return this.productsService.updateProduct(Number(params.id), product);
  }

  @Delete('/:id')
  deleteProduct(@Param() params): Product[] {
    return this.productsService.deleteProduct(params.id);
  }
}
