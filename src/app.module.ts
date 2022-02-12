import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [AuthModule, UserModule, ProductModule, UploadModule, MulterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
