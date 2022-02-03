import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') code: string): Promise<Product> {
    return this.service.findOne(code);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') code: string, @Body() data: UpdateProductDto) {
    return this.service.update(code, data);
  }
}
