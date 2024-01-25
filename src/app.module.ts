import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { StoresService } from './stores/stores.service';
import { ProductsController } from './products/products.controller';
import { StoresController } from './stores/stores.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, StoresController],
  providers: [AppService, ProductsService, StoresService],
})
export class AppModule {}
