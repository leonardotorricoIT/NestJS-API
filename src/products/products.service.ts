import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll() {
    return 'This action returns all products';
  }

  food() {
    let lista = ['pizza', 'hamburguesa', 'hot dog'];
    return lista;
  }
}
