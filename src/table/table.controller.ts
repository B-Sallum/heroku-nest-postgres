import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiProperty,
  ApiBody,
} from '@nestjs/swagger';
import AuthUser from 'src/auth/decorators/auth-user.decorator';
import { ModLog, User } from '@prisma/client';
import { UploadService } from './table.service';

class ExcelUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private service: UploadService) {}
  
  @UseGuards(AuthGuard())
  @Post('/sendfile')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Recebe uma planilha excel e faz modificações ',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ExcelUploadDto,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user: User,
  ) {
    return this.service.readFile(file, user);
  }
  
  @Get('/download')
  async downloadFile(){
    return this.service.downloadTable()
  }
}

//Receber a planilha e salvar em uma pasta
//Ler a Planilha e verificar se esta de acordo com os dados
// Separar em um array e salvar no banco fazendo o update many