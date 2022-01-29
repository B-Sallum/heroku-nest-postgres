import {
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  @IsNotEmpty({ message: 'Por favor insira um nome' })
  @Length(3, 150)
  name: string;

  @IsNotEmpty({
    message: 'O e-mail da empresa é obrigatório para fazer cadastro no sistema',
  })
  @IsEmail({
    message: 'Por favor insira um e-mail válido user@restoque.com.br',
  })
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha pouco segura',
  })
  @Length(8, 20, { message: 'A senha deve conter de 8 a 20 dígitos' })
  pass: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha pouco segura',
  })
  @Length(8, 20, {
    message: 'A confirmação da senha deve conter de 8 a 20 dígitos',
  })
  passConfirm: string;

  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  active: boolean;
}
