import {
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsAlpha('pt-br', { message: 'O nome deve conter apenas letras' })
  @IsNotEmpty({ message: 'Por favor insira um nome' })
  @Length(3, 150)
  nome: string;

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
  senha: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha pouco segura',
  })
  @Length(8, 20, {
    message: 'A confirmação da senha deve conter de 8 a 20 dígitos',
  })
  confirmacaoSenha: string;

  @IsBoolean()
  administrador: boolean;

  @IsBoolean()
  ativo: boolean;
}
