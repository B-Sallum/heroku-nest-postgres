import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './excel-file/table.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
