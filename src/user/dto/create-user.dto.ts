import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
  @IsAlpha()
  @IsNotEmpty({ message: 'Por favor insira um nome' })
  @Length(3, 150)
  @ApiProperty()
  name: string;

  @IsNotEmpty({
    message: 'O e-mail da empresa é obrigatório para fazer cadastro no sistema',
  })
  @IsEmail({
    message: 'Por favor insira um e-mail válido user@restoque.com.br',
  })
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role

  @Length(6, 20, { message: 'A senha deve conter de 6 a 20 dígitos' })
  @ApiProperty()
  pass: string;

  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Senha pouco segura',
  // })
  @Length(6, 20, {
    message: 'A confirmação da senha deve conter de 6 a 20 dígitos',
  })
  @ApiProperty()
  passConfirm: string;
}
