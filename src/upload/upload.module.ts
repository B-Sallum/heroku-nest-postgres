import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    PrismaService ,PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
