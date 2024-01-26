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
import { StoresService } from './stores.service';
import { StoreDto } from './store.dto';
import { Store } from './store.entity';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  async findAll(@Res() res) {
    const data = await this.storesService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'stores founded',
      data: data,
    });
  }

  @Get(':storeId')
  async findOne(@Param('storeId') storeId: number, @Res() res) {
    const data = await this.storesService.findOne(storeId);
    let message = 'store not founded';
    let statusCode = HttpStatus.NOT_FOUND;
    if (data) {
      message = 'store founded';
      statusCode = HttpStatus.OK;
    }
    return res.status(HttpStatus.OK).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Post()
  async create(@Body() body, @Res() res) {
    const newStore: StoreDto = body;
    let data = null;
    let message = 'store not created';
    let statusCode = HttpStatus.BAD_REQUEST;
    const regexp = new RegExp(/^[A-Z]{3,3}$/);
    if (regexp.test(newStore.city)) {
      data = await this.storesService.create(newStore);
      message = 'store created';
      statusCode = HttpStatus.CREATED;
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Put(':storeId')
  async update(@Param('storeId') storeId: number, @Body() body, @Res() res) {
    const newStore: Store = body;
    let data = null;
    let message = 'store not updated';
    let statusCode = HttpStatus.BAD_REQUEST;
    const regexp = new RegExp(/[A-Z]{3,3}/);
    if (regexp.test(newStore.city)) {
      data = await this.storesService.update(storeId, newStore);
      if (data) {
        message = 'store updated';
        statusCode = HttpStatus.OK;
      }
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  @Delete(':storeId')
  async delete(@Param('storeId') storeId: number, @Res() res) {
    const data = await this.storesService.delete(storeId);
    let message = 'store not deleted';
    let statusCode = HttpStatus.BAD_REQUEST;
    if (data.affected != 0) {
      message = 'store deleted';
      statusCode = HttpStatus.OK;
    }
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }
}
