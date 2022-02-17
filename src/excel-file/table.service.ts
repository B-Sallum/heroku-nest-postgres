import { Injectable, Res } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { User } from '@prisma/client';
import { updateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma.service';
import { StreamableFile } from '@nestjs/common';

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
