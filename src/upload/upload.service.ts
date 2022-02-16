import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { User, Product } from '@prisma/client';
import { prisma } from '@prisma/client';
import { updateTableDto } from './dto/update-preco.dto';
import { PrismaService } from 'src/prisma.service';
import { TextEncoderStream } from 'node:stream/web';

@Injectable()
export class UploadService {
  constructor(private db: PrismaService) {}
  async readFile(file: Express.Multer.File, user: User, code:string) {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: updateTableDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );
    const updateTable = excelRows.forEach(async(excelArray) => {
      const table = await this.db.product.update({
        where: { code: excelArray.code },
        data: excelArray
      })
      return table
    })
    console.log(updateTable)
    // return updateTable
  }
}
