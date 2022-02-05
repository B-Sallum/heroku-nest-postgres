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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(AuthGuard())
  @Post('/create')
  @ApiOperation({
    summary: 'Cadastrar um produto',
  })
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get('/findAll')
  @ApiOperation({
    summary: 'Pegar todos os produtos cadastrados',
  })
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('find/:code')
  @ApiOperation({
    summary: 'Pegar por código do produto',
  })
  findOne(@Param('id') code: string): Promise<Product> {
    return this.service.findOne(code);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar os produtos',
  })
  update(@Param('id') code: string, @Body() data: UpdateProductDto) {
    return this.service.update(code, data);
  }
}
