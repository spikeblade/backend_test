import { Module } from '@nestjs/common';
import { Product } from './Product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Relationship } from '../relationships/relationship.entity';
import { RelationshipsService } from '../relationships/relationships.service';
import { Store } from '../stores/store.entity';
import { StoresService } from '../stores/stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Relationship, Store])],
  providers: [ProductsService, RelationshipsService, StoresService],
  controllers: [ProductsController],
})
export class ProductsModule {}
