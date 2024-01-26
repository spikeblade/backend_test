import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }
  async findOne(productId: number): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id: productId } });
  }
  async create(newProduct: ProductDto): Promise<Product> {
    return await this.productsRepository.save(newProduct);
  }
  async update(productId: number, newProduct: ProductDto): Promise<Product> {
    const toUpdate = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (toUpdate === null) {
      return null;
    }
    const updated = Object.assign(toUpdate, newProduct);

    return await this.productsRepository.save(updated);
  }
  async delete(productId: number): Promise<any> {
    return await this.productsRepository.delete(productId);
  }
}
