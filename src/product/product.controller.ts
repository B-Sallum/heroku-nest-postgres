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
import { Product, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthUser from 'src/auth/auth-user.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(AuthGuard())
  @Post()
  @ApiOperation({
    summary: 'Cadastrar um produto',
  })
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({
    summary: 'Buscar todos os produtos cadastrados',
  })
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('/:code')
  @ApiOperation({
    summary: 'Buscar um produto por código',
  })
  findOne(@Param('code') code: string): Promise<Product> {
    return this.service.findOne(code);
  }

  @UseGuards(AuthGuard())
  @Patch('/:code')
  @ApiOperation({
    summary: 'Atualizar um produto',
  })
  update(
    @AuthUser() user: User,
    @Param('code') code: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.service.update(user, code, data);
  }
}
