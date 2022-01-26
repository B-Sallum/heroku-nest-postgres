import { Module } from '@nestjs/common';
import { OpenRoutesModule } from './open-routes/open-routes.module';

@Module({
  imports: [OpenRoutesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
