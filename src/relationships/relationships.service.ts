import { Injectable } from '@nestjs/common';
import { RelationshipDto } from './relationship.dto';
import { Relationship } from './relationship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipsRepository: Repository<Relationship>,
  ) {}

  async addStoreToProduct(
    newRelationship: RelationshipDto,
  ): Promise<Relationship> {
    return await this.relationshipsRepository.save(newRelationship);
  }

  async findStoresFromProduct(productId: number): Promise<Relationship[]> {
    return await this.relationshipsRepository.find({
      where: { product: productId },
    });
  }

  async findStoreFromProduct(
    productId: number,
    storeId: number,
  ): Promise<Relationship> {
    return await this.relationshipsRepository.findOne({
      where: { product: productId, store: storeId },
    });
  }
}
