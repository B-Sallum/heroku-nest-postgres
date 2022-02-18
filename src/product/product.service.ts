import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, User } from '@prisma/client';
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

    console.log(data);

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
      throw new NotFoundException('Produto não encontrado com este código');
    }

    return product;
  }

  async update(
    user: User,
    code: string,
    data: UpdateProductDto,
  ): Promise<Product> {
    const oldProduct = await this.findOne(code);

    const product = await this.database.product.update({
      where: { code },
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        collection: data.collection,
        griffe: data.griffe,
        stock: data.stock,
        active: data.active,
        price: data.price,
        discount: data.discount,
        finalPrice: data.finalPrice,
      },
    });

    if (oldProduct.price !== product.price) {
      await this.database.modLog.create({
        data: {
          user_id: user.id,
          product_id: code,
          alter_field: 'Valor original',
          original: oldProduct.price,
          new: product.price,
        },
      });
    }

    if (oldProduct.discount !== product.discount) {
      await this.database.modLog.create({
        data: {
          user_id: user.id,
          product_id: code,
          alter_field: 'Desconto',
          original: oldProduct.discount,
          new: product.discount,
        },
      });
    }

    if (oldProduct.finalPrice !== product.finalPrice) {
      await this.database.modLog.create({
        data: {
          user_id: user.id,
          product_id: code,
          alter_field: 'Preço final',
          original: oldProduct.finalPrice,
          new: product.finalPrice,
        },
      });
    }

    return product;
  }
}
