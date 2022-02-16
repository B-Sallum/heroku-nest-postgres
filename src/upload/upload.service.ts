import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { User } from '@prisma/client';
import { updateTableDto } from './dto/update-preco.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}
  async readFile(file: Express.Multer.File, user: User) {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: updateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );
    excelRows.forEach(async (product) => {
      const table = await this.db.product.update({
        where: { code: product.code },
        data: {
          discount: product.discount,
        },
      });
      console.log(table, user);
    });
  }
}
