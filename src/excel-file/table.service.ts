import { UpdateProductDto } from './../product/dto/update-product.dto';
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Product, User } from '@prisma/client';
import { updateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma.service';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}

  async getProduct(code: string) {
    console.log('11 GET');
    await this.db.product
      .findUnique({
        where: { code },
      })
      .then((res: Product) => {
        return res.price;
      });
  }

  async updateProduct(product: UpdateProductDto) {
    console.log('2222 UPDATE');
    await this.db.product.update({
      where: { code: product.code },
      data: {
        discount: product.discount,
        finalPrice: product.finalPrice,
        price: product.price,
      },
    });
  }

  async readFile(file: Express.Multer.File, user: User) {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: updateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );

    excelRows.map(async (product) => {
      const newDiscount = product.discount;
      const newPrice = null;
      const newFinalPrice = null;

      const logModifications = async () => {
        console.log('33333333 LOG');
        await this.db.modLog.create({
          data: {
            user_id: user.id,
            product_id: product.code,
            alter_field: 'Preço final',
            original: newPrice,
            new: newFinalPrice,
          },
        });
      };
    });
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
