import { Module } from '@nestjs/common';
import { Product } from './Product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Relationship } from '../relationships/relationship.entity';
import { RelationshipsService } from '../relationships/relationships.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Relationship]),
  ],
  providers: [ProductsService, RelationshipsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
