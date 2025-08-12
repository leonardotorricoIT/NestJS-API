import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll(): string {
    return 'This action returns all products';
  }
}
