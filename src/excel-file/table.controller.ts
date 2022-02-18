import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFile,
  Response,
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
import { ModLog, Product, User } from '@prisma/client';
import { UploadService } from './table.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

class ExcelUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('File')
@Controller('file')
export class UploadController {
  constructor(private service: UploadService) {}

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Recebe uma planilha excel e faz modificações',
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
    return await this.service.readFile(file, user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/download')
  @ApiOperation({
    summary: 'Recebe uma planilha excel e faz modificações',
  })
  @ApiBearerAuth()
  async downloadFile(
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="logTable.xlsx"',
    });
    return this.service.downloadTable();
  }
}
