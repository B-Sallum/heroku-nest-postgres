import { Module } from '@nestjs/common';
import { UploadService } from './table.service';
import { UploadController } from './table.controller';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
