import { Module } from '@nestjs/common';
import { Relationship } from './relationship.entity';
import { RelationshipsService } from './relationships.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
