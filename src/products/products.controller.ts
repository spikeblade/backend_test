import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RelationshipsService } from '../relationships/relationships.service';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { Relationship } from '../relationships/relationship.entity';
import { RelationshipDto } from '../relationships/relationship.dto';
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private relationshipsService: RelationshipsService,
  ) {}

  @Get()
  async findAll(@Res() res) {
    const data = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'product founded',
      data: data,
    });
  }
  @Get(':productId')
  findOne(@Param('productId') productId: number): Promise<Product> {
    return this.productsService.findOne(productId);
  }
  @Get(':productId/stores')
  findStoresFromProduct(
    @Param('productId') productId: number,
  ): Promise<Relationship[]> {
    return this.relationshipsService.findStoresFromProduct(productId);
  }
  @Get(':productId/store')
  findStoreFromProduct(
    @Param('productId') productId: number,
  ): Promise<Relationship> {
    return this.relationshipsService.findStoreFromProduct(productId);
  }
  @Post()
  async create(@Res() res, @Body() body): Promise<Product> {
    const newProduct: ProductDto = body;
    const data = await this.productsService.create(newProduct);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'product created',
      data: data,
    });
  }
  @Post(':productId/stores/:storeId')
  addStoreToProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ): Promise<Relationship> {
    const newRelationship: RelationshipDto = {
      product: productId,
      store: storeId,
    };
    return this.relationshipsService.addStoreToProduct(newRelationship);
  }
  @Put(':productId')
  update(
    @Param('productId') productId: number,
    @Body() body,
  ): Promise<Product> {
    const newProduct: ProductDto = body;
    return this.productsService.update(productId, newProduct);
  }
  @Put(':productId/stores/:storeId')
  updateStoresFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ): Promise<Relationship> {
    const newRelationship: RelationshipDto = {
      product: productId,
      store: storeId,
    };
    return this.relationshipsService.updateStoresFromProduct(
      newRelationship,
      newRelationship.store,
    );
  }
  @Delete(':productId')
  delete(@Param('productId') productId: number): Promise<Product> {
    return this.productsService.delete(productId);
  }
  @Delete(':productId/stores')
  deleteStoresFromProduct(
    @Param('productId') productId: number,
  ): Promise<Relationship> {
    return this.relationshipsService.deleteStoreFromProduct(productId);
  }
}
