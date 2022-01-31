import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') code: string): Promise<Product> {
    return this.service.findOne(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }
}
