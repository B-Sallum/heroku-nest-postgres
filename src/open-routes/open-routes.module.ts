import { Module } from '@nestjs/common';
import { OpenRoutesService } from './open-routes.service';
import { OpenRoutesController } from './open-routes.controller';

@Module({
  controllers: [OpenRoutesController],
  providers: [OpenRoutesService],
})
export class OpenRoutesModule {}
