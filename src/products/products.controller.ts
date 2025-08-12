import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  @ApiOperation({ summary: 'Get all producs' })
  @ApiResponse({ status: 200, description: 'Products returned suscesfully' })
  findAll(@Req() request: Request, @Res() response: Response) {
    console.log(request.url);
    response.status(201).json(this.productsService.findAll());
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a product' })
  create(@Body() product: any) {
    console.log(product);
    return 'This action creates a product';
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a product' })
  update() {
    return 'This action updates a product';
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Put a product' })
  put() {
    return 'This action puts a product';
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product' })
  remove() {
    return 'This action removes a product';
  }
}
