import { PrismaService } from '../prisma.service';
import {
  ConflictException,
  Injectable,
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, data: UpdateUserDto) {
    return `This action updates a #${id} user with this data ${data}`;
  }

  inactive(id: string) {
    return `This inactive a ${id} user`;
  }
}
