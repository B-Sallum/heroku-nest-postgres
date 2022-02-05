import {
  IsAlpha,
  IsBoolean,
  IsOptional,
  Length,
  // Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsAlpha('pt-br', { message: 'O nome deve conter apenas letras' })
  @IsOptional()
  @Length(3, 150)
  @ApiProperty()
  name: string;

  @IsOptional()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Senha pouco segura',
  // })
  @Length(8, 20, { message: 'A senha deve conter de 8 a 20 dígitos' })
  @ApiProperty()
  password: string;

  @IsOptional()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Senha pouco segura',
  // })
  @Length(8, 20, {
    message: 'A confirmação da senha deve conter de 8 a 20 dígitos',
  })
  @ApiProperty()
  passwordConfirmation: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  admin: boolean;
}
