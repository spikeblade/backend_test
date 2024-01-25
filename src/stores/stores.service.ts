import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {
  findAll(): any {
    return 'find all funcionando';
  }
  findOne(storeId: number) {
    return `find one funcionando con storeId: ${storeId}`;
  }
  create(newStore: any) {
    return newStore;
  }
  update(storeId: number, newStore: any) {
    return newStore;
  }
  delete(storeId: number) {
    return `delete funcionando con storeId: ${storeId}`;
  }
}
