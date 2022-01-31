import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private database: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const checkProduct = await this.database.product.findUnique({
      where: { code: data.code },
    });

    if (checkProduct) {
      throw new ConflictException('Produto já cadastrado');
    }

    const product = await this.database.product.create({ data });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.database.product.findMany();

    return products;
  }

  async findOne(code: string): Promise<Product> {
    const product = await this.database.product.findUnique({
      where: { code },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(code: string, data: UpdateProductDto): Promise<Product> {
    await this.findOne(code);

    const product = await this.database.product.update({
      where: { code },
      data: data,
    });

    return product;
  }
}
