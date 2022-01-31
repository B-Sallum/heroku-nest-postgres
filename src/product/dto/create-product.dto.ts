import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira o código do produto' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira um nome' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma descrição' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira a Coleção' })
  collection: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira a Griffe' })
  griffe: string;

  stock: boolean;

  active: boolean;

  @IsNotEmpty({ message: 'Insira o valor original' })
  price: number;

  discount: number;

  finalPrice: number;
}
