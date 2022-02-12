import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import AuthUser from 'src/auth/auth-user.decorator';
import { User } from '@prisma/client';
import xlsx from 'node-xlsx';
import Xlsx from 'xlsx'
import fs from 'fs'


@Controller('upload')
export class UploadController {
  
  @UseGuards(AuthGuard())
  @Post('sendfile')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Recebe uma planilha excel e faz modificações '
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File, @AuthUser() user: User){
    // console.log(file)
    const dados = xlsx.parse(file.path)
    const sh = dados.flatMap
    console.log(dados)
    console.log(sh)
  }
}


//Receber a planilha e salvar em uma pasta
//Ler a Planilha e verificar se esta de acordo com os dados
// Separar em um array e salvar no banco fazendo o update many
