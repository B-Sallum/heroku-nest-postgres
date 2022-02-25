import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Product, User } from '@prisma/client';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma.service';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}

  async getProduct(code: string): Promise<Product> {
    console.log('11 GET');
    const product: Product = await this.db.product.findUnique({
      where: { code },
    });
    return product;
  }

  async updateProduct(product: UpdateTableDto): Promise<Product> {
    console.log('2222 UPDATE');
    const updateProduct = await this.db.product.update({
      where: { code: product.code },
      data: {
        discount: product.discount,
        finalPrice: product.finalPrice,
        price: product.price,
      },
    });
    return updateProduct;
  }

  async logModifications(
    user: User,
    product: UpdateTableDto,
  ): Promise<{ message: string }> {
    console.log('33333333 LOG');
    await this.db.modLog.create({
      data: {
        user_id: user.id,
        product_id: product.code,
        alter_field: 'Preço final',
        original: product.price,
        new: product.finalPrice,
      },
    });
    return { message: 'Ok' };
  }

  async readFile(
    file: Express.Multer.File,
    user: User,
  ): Promise<{ message: string }> {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: UpdateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );

    const updateAll = excelRows.map(async (product) => {
      const code = product.code;
      const discount = product.discount;
      let finalPrice = null;
      let price = null;

      if (!product.price) {
        const productFromDb = await this.getProduct(code);
        price = productFromDb.price;
      }

      finalPrice = (price / 100) * (100 - discount);

      await this.updateProduct({
        code,
        discount,
        finalPrice,
        price,
      });

      const message = await this.logModifications(user, product);

      return message;
    });

    const message = Promise.all(updateAll).then(() => {
      return { message: 'All update?' };
    });

    return message;
  }

  async downloadTable() {
    const logs = await this.db.modLog.findMany();
    const logsToArray = logs.map(({ ...rest }) => rest);
    //fazendo o json virar um excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(logsToArray);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    const arquivoFinal = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });
    return new StreamableFile(arquivoFinal);
  }
}
