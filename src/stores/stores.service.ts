import { Injectable } from '@nestjs/common';
import { StoreDto } from './store.dto';
import { Store } from './store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storesRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    return await this.storesRepository.find();
  }

  async findOne(storeId: number): Promise<Store> {
    return await this.storesRepository.findOne({ where: { id: storeId } });
  }

  async create(newStore: StoreDto): Promise<Store> {
    return await this.storesRepository.save(newStore);
  }

  async update(storeId: number, newStore: StoreDto): Promise<Store> {
    const toUpdate = await this.storesRepository.findOne({
      where: { id: storeId },
    });
    if (toUpdate === null) {
      return null;
    }
    const updated = Object.assign(toUpdate, newStore);
    return await this.storesRepository.save(updated);
  }

  async delete(storeId: number): Promise<any> {
    return await this.storesRepository.delete(storeId);
  }
}
