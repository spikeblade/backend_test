import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }
  @Get(':storeId')
  findOne(@Param('storeId') storeId: number) {
    return this.storesService.findOne(storeId);
  }
  @Post()
  create(@Body() body) {
    const newStore: any = body;
    return this.storesService.create(newStore);
  }
  @Put(':storeId')
  update(@Param('storeId') storeId: number, @Body() body) {
    const newStore: any = body;
    return this.storesService.update(storeId, newStore);
  }
  @Delete(':storeId')
  delete(@Param('storeId') storeId: number) {
    return this.storesService.delete(storeId);
  }
}
