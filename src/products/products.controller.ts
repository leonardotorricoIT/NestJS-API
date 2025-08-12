import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/getAll')
  @ApiOperation({ summary: 'Get all producs' })
  @ApiResponse({ status: 200, description: 'Products returned suscesfully' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/food')
  @ApiOperation({ summary: 'Get food' })
  food() {
    return this.productsService.food();
  }
}
