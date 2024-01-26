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
      message: 'products founded',
      data: data,
    });
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: number, @Res() res) {
    const data = await this.productsService.findOne(productId);
    let message = 'product not founded';
    let statusCode = HttpStatus.NOT_FOUND;
    if (data) {
      message = 'product founded';
      statusCode = HttpStatus.OK;
    }
    return res.status(HttpStatus.OK).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
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
  async create(@Res() res, @Body() body) {
    const newProduct: ProductDto = body;
    let data = null;
    let message = 'product not created';
    let statusCode = HttpStatus.BAD_REQUEST;
    if (
      newProduct.type === 'Perecedero' ||
      newProduct.type === 'No perecedero'
    ) {
      data = await this.productsService.create(newProduct);
      message = 'product created';
      statusCode = HttpStatus.CREATED;
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Post(':productId/stores/:storeId')
  addStoreToProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ) {
    const newRelationship: RelationshipDto = {
      product: productId,
      store: storeId,
    };
    return this.relationshipsService.addStoreToProduct(newRelationship);
  }

  @Put(':productId')
  async update(
    @Param('productId') productId: number,
    @Body() body,
    @Res() res,
  ) {
    const newProduct: ProductDto = body;
    let data = null;
    let message = 'product not updated';
    let statusCode = HttpStatus.BAD_REQUEST;
    if (
      newProduct.type === 'Perecedero' ||
      newProduct.type === 'No perecedero'
    ) {
      data = await this.productsService.update(productId, newProduct);
      if (data) {
        message = 'product updated';
        statusCode = HttpStatus.OK;
      }
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Put(':productId/stores/:storeId')
  updateStoresFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ) {
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
  async delete(@Param('productId') productId: number, @Res() res) {
    const data = await this.productsService.delete(productId);
    let message = 'product not deleted';
    let statusCode = HttpStatus.BAD_REQUEST;
    if (data.affected != 0) {
      message = 'product deleted';
      statusCode = HttpStatus.OK;
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Delete(':productId/stores')
  deleteStoresFromProduct(@Param('productId') productId: number) {
    return this.relationshipsService.deleteStoreFromProduct(productId);
  }
}
