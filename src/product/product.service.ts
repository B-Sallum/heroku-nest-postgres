import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  create(data: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, data: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  inactive(id: string) {
    return `This action removes a #${id} product`;
  }
}
