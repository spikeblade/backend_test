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
import { StoresService } from '../stores/stores.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private relationshipsService: RelationshipsService,
    private storesService: StoresService,
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
  async findStoresFromProduct(
    @Param('productId') productId: number,
    @Res() res,
  ) {
    const stores = [];
    const relatedStores =
      await this.relationshipsService.findStoresFromProduct(productId);
    for (const store of relatedStores) {
      const found = await this.storesService.findOne(store.store);
      if (found) {
        stores.push(found);
      }
    }
    let message = 'stores by product id not founded';
    let statusCode = HttpStatus.NOT_FOUND;
    if (stores.length > 0) {
      message = 'stores by product id founded';
      statusCode = HttpStatus.OK;
    }
    return res.status(HttpStatus.OK).json({
      statusCode: statusCode,
      message: message,
      data: stores,
    });
  }

  @Get(':productId/store/:storeId')
  async findStoreFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
    @Res() res,
  ) {
    let data = null;
    const relatedStore = await this.relationshipsService.findStoreFromProduct(
      productId,
      storeId,
    );
    if (relatedStore) {
      data = await this.storesService.findOne(relatedStore.store);
    }
    let message = 'store by product id not founded';
    let statusCode = HttpStatus.NOT_FOUND;
    if (data) {
      message = 'store by product id founded';
      statusCode = HttpStatus.OK;
    }
    return res.status(HttpStatus.OK).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
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
  async addStoreToProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
    @Res() res,
  ) {
    const newRelationship: RelationshipDto = {
      product: productId,
      store: storeId,
    };
    let data = null;
    let message = 'relationship not created';
    let statusCode = HttpStatus.BAD_REQUEST;
    const product = await this.productsService.findOne(productId);
    const store = await this.storesService.findOne(storeId);
    const relation = await this.relationshipsService.findStoreFromProduct(
      productId,
      storeId,
    );
    if (product && store && relation == null) {
      data = await this.relationshipsService.addStoreToProduct(newRelationship);
      message = 'relationship created';
      statusCode = HttpStatus.CREATED;
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
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
}
