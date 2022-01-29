import { PrismaService } from '../prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    if (data.pass !== data.passConfirm) {
      throw new UnauthorizedException("Passwords don't match");
    } else {
      delete data.passConfirm;
    }

    const checkUser = await this.database.user.findUnique({
      where: { email: data.email },
    });

    if (checkUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = 10;
    const hashPass = await bcrypt.hash(data.pass, salt);

    const user = await this.database.user.create({
      data: {
        ...data,
        pass: hashPass,
        admin: false,
        active: true,
      },
    });

    delete user.pass;
    return user;
  }

  async findAll(): Promise<User[]> {
    const usersList = await this.database.user.findMany();

    return usersList;
  }

  async findOne(id: number): Promise<any> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    const logs = await this.database.log.findMany({
      where: {
        user_id: id,
      },
    });

    return [user, logs];
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const checkUser = await this.database.user.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException(
        'Ocorreu um erro no sistema, favor entrar em contato com o suporte.',
      );
    }

    const updatedUser = await this.database.user.update({
      where: { id },
      data: data,
    });

    return updatedUser;
  }
}
