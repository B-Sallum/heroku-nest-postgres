import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty()
  pass: string;
}

export class AuthResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  user: User;
}
