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
import { RelationshipsService } from '../relationships/relationships.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private relationshipsService: RelationshipsService,
  ) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':productId')
  findOne(@Param('productId') productId: number) {
    return this.productsService.findOne(productId);
  }
  @Get(':productId/stores')
  findStoresFromProduct(@Param('productId') productId: number) {
    return this.relationshipsService.findStoresFromProduct(productId);
  }
  @Get(':productId/store')
  findStoreFromProduct(@Param('productId') productId: number) {
    return this.relationshipsService.findStoreFromProduct(productId);
  }
  @Post()
  create(@Body() body) {
    const newProduct: any = body;
    return this.productsService.create(newProduct);
  }
  @Post(':productId/stores/:storeId')
  addStoreToProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ) {
    return this.relationshipsService.addStoreToProduct(productId, storeId);
  }
  @Put(':productId')
  update(@Param('productId') productId: number, @Body() body) {
    const newProduct: any = body;
    return this.productsService.update(productId, newProduct);
  }
  @Put(':productId/stores/:storeId')
  updateStoresFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ) {
    return this.relationshipsService.updateStoresFromProduct(
      productId,
      storeId,
    );
  }
  @Delete(':productId')
  delete(@Param('productId') productId: number) {
    return this.productsService.delete(productId);
  }
  @Delete(':productId/stores')
  deleteStoresFromProduct(@Param('productId') productId: number) {
    return this.relationshipsService.deleteStoreFromProduct(productId);
  }
}
