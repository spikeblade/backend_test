import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { StoresService } from './stores/stores.service';
import { ProductsController } from './products/products.controller';
import { StoresController } from './stores/stores.controller';
import { RelationshipsService } from './relationships/relationships.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, StoresController],
  providers: [AppService, ProductsService, StoresService, RelationshipsService],
})
export class AppModule {}
