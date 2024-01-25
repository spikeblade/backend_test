import { Injectable } from '@nestjs/common';

@Injectable()
export class RelationshipsService {
  addStoreToProduct(productId: number, storeId: number): any {
    return storeId;
  }
  findStoresFromProduct(productId: number) {
    return `find all stores by product funcionando con productId: ${productId}`;
  }
  findStoreFromProduct(productId: number) {
    return `find one store by product funcionando con productId: ${productId}`;
  }
  updateStoresFromProduct(productId: number, storeId: number) {
    return storeId;
  }
  deleteStoreFromProduct(productId: number) {
    return `delete funcionando con productId: ${productId}`;
  }
}
