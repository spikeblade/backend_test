import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll(): any {
    return 'find all funcionando';
  }
  findOne(productId: number) {
    return `find one funcionando con productId: ${productId}`;
  }
  create(newProduct: any) {
    return newProduct;
  }
  update(productId: number, newProduct: any) {
    return newProduct;
  }
  delete(productId: number) {
    return `delete funcionando con productId: ${productId}`;
  }
}
