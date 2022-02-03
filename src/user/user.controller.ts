import { User } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.service.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(+id, data);
  }
}
