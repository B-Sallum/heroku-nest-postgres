import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags, ApiProperty, ApiBody } from '@nestjs/swagger';
import AuthUser from 'src/auth/auth-user.decorator';
import { User } from '@prisma/client';
import { UploadService } from './upload.service';
import xlsx from 'node-xlsx';
import XLSX  from 'xlsx'
import fs from 'fs'

class ExcelUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  
  constructor(private service: UploadService ){}

  @UseGuards(AuthGuard())
  @Post('sendfile')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Recebe uma planilha excel e faz modificações '
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type:ExcelUploadDto
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @AuthUser() user: User){
    return this.service.readFile(file, user);
  }
}


//Receber a planilha e salvar em uma pasta
//Ler a Planilha e verificar se esta de acordo com os dados
// Separar em um array e salvar no banco fazendo o update many
