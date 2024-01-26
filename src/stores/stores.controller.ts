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
import { StoreDto } from './store.dto';
import { Store } from './store.entity';

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
    const newStore: StoreDto = body;
    return this.storesService.create(newStore);
  }
  @Put(':storeId')
  update(@Param('storeId') storeId: number, @Body() body) {
    const newStore: Store = body;
    return this.storesService.update(storeId, newStore);
  }
  @Delete(':storeId')
  delete(@Param('storeId') storeId: number) {
    return this.storesService.delete(storeId);
  }
}
