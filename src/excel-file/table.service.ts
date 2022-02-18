import { BadRequestException, Injectable, Res } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Product, User } from '@prisma/client';
import { updateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma.service';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}

  async updateProduct(
    id: number,
    code: string,
    newDiscount: number,
    newPrice: number,
    newFinalPrice: number,
  ) {
    console.log('Aplicando update do produto no banco');
    await this.db.product.update({
      where: { code },
      data: {
        discount: newDiscount,
        finalPrice: newFinalPrice,
        price: newPrice,
      },
    });
  }

  async readFile(file: Express.Multer.File, user: User) {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: updateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );

    const orderPromise = excelRows.map(async (product) => {
      if (!product.discount) {
        throw new BadRequestException('Produto sem informações de desconto');
      }

      const newDiscount = product.discount;
      let newPrice = null;
      let newFinalPrice = null;

      console.log('Linha do produto sendo lida');

      if (!product.price) {
        console.log('Produto sem preço, puxando valor do banco');
        await this.db.product
          .findUnique({
            where: { code: product.code },
          })
          .then((res) => {
            newPrice = res.price;
          })
          .then(() => {
            newFinalPrice = (newPrice / 100) * (100 - newDiscount);
          })
          .then(() => {
            this.updateProduct(
              user.id,
              product.code,
              newDiscount,
              newPrice,
              newFinalPrice,
            );
          });
      } else {
        console.log('Linha de produto com novo preço');
        newPrice = product.price;
        newFinalPrice = (newPrice / 100) * (100 - newDiscount);
        this.updateProduct(
          user.id,
          product.code,
          newDiscount,
          newPrice,
          newFinalPrice,
        );
      }
    });
    const message = Promise.all(orderPromise).then(() => {
      console.log(orderPromise);
      return { message: 'Tabela atualizada' };
    });
    return await message;
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
