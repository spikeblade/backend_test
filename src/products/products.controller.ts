import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':productId')
  findOne(@Param('productId') productId: number) {
    return this.productsService.findOne(productId);
  }
  @Post()
  create(@Body() body) {
    const newProduct: any = body;
    return this.productsService.create(newProduct);
  }
  @Put(':productId')
  update(@Param('productId') productId: number, @Body() body) {
    const newProduct: any = body;
    return this.productsService.update(productId, newProduct);
  }
  @Delete(':productId')
  delete(@Param('productId') productId: number) {
    return this.productsService.delete(productId);
  }
}
