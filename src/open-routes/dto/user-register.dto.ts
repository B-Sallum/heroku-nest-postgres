import {
  IsAlphanumeric,
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class RegisterUserDto {
  @IsAlpha('pt-br', { message: 'O nome deve conter apenas letras' })
  @IsNotEmpty({ message: 'Por favor insira um nome' })
  @Length(3, 150)
  name: string;

  @IsAlpha('pt-br', { message: 'O nome deve conter apenas letras' })
  @IsNotEmpty({ message: 'Por favor insira um nome social ou apelido' })
  @Length(3, 150)
  socialName: string;

  @IsNotEmpty({
    message: 'O e-mail da empresa é obrigatório para fazer cadastro no sistema',
  })
  @IsEmail({
    message: 'Por favor insira um e-mail válido user@restoque.com.br',
  })
  email: string;

  @IsInt()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  cpf: bigint;

  @IsAlphanumeric()
  @IsNotEmpty({ message: 'Senha obrigatória' })
  @Length(6, 20, { message: 'Por favor insira uma senha de 8 a 20 dígitos' })
  password: string;

  @IsAlphanumeric()
  @IsNotEmpty({ message: 'Confirmação de Senha obrigatória' })
  @Length(6, 20, { message: 'Por favor insira uma senha de 8 a 20 dígitos' })
  passwordConfirmation: string;

  @IsBoolean()
  admin: boolean;
}
