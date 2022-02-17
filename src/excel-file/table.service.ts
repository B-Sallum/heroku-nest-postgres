import { BadRequestException, Injectable, Res } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { User } from '@prisma/client';
import { updateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma.service';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}

  async updateProduct(
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

  async readFile(
    file: Express.Multer.File,
    user: User,
  ): Promise<{ message: string }> {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: updateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );
    excelRows.forEach(async (product) => {
      if (!product.discount) {
        throw new BadRequestException('Produto sem informações de desconto');
      }

      const newDiscount = product.discount;
      let newPrice = null;
      let newFinalPrice = null;

      console.log('Produto sendo lido');

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
              product.code,
              newDiscount,
              newPrice,
              newFinalPrice,
            );
          });
      } else {
        console.log('Produto com novo preço');
        newPrice = product.price;
        newFinalPrice = (newPrice / 100) * (100 - newDiscount);
        this.updateProduct(product.code, newDiscount, newPrice, newFinalPrice);
      }
    });
    return { message: 'Tabela inserida com sucesso' };
  }

  async downloadTable() {
    const logs = await this.db.modLog.findMany();
    const logsToArray = logs.map(({ ...rest }) => rest);
    //fazendo o json virar um excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(logsToArray);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    const arquivoFinal = XLSX.write(workbook, {
      bookType: 'xls',
      type: 'buffer',
    });
    console.log(arquivoFinal);
    return new StreamableFile(arquivoFinal);
  }
}
