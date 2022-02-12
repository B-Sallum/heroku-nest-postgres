import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),MulterModule.register({
    dest: './uploads'
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
