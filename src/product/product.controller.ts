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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthUser from 'src/auth/decorators/auth-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  @ApiOperation({
    summary: 'Cadastrar um produto',
  })
  @ApiBearerAuth()
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  @ApiOperation({
    summary: 'Buscar todos os produtos cadastrados',
  })
  @ApiBearerAuth()
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/:code')
  @ApiOperation({
    summary: 'Buscar um produto por código',
  })
  @ApiBearerAuth()
  findOne(@Param('code') code: string): Promise<Product> {
    return this.service.findOne(code);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('/:code')
  @ApiOperation({
    summary: 'Atualizar um produto',
  })
  @ApiBearerAuth()
  update(
    @AuthUser() user: User,
    @Param('code') code: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.service.update(user, code, data);
  }
}
