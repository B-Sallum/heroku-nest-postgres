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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('/')
  @ApiOperation({
    summary: 'Cadastrar um usuário',
  })
  @ApiBearerAuth()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/')
  @ApiOperation({
    summary: 'Buscar todos os usuários',
  })
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Retornar um usuário com os logs',
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: number): Promise<any> {
    return this.service.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um usuário',
  })
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(+id, data);
  }
}
