import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/user-register.dto';
import { OpenRoutesService } from './open-routes.service';

@Controller('open-routes')
export class OpenRoutesController {
  constructor(private readonly service: OpenRoutesService) {}

  @Post()
  create(@Body() data: RegisterUserDto): Promise<{ message: string }> {
    return this.service.register(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
