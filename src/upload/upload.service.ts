import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { User } from '@prisma/client';
import { editPrecoDto } from './dto/update-preco.dto';

@Injectable()
export class UploadService {
  async readFile(file: Express.Multer.File, user: User) {
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const excelRows: editPrecoDto[] = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
    );
    console.log(excelRows)
  }
}
