import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Insira o código do produto' })
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira um nome' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira uma descrição' })
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira a Coleção' })
  @ApiProperty()
  collection: string;

  @IsString()
  @IsNotEmpty({ message: 'Insira a Griffe' })
  @ApiProperty()
  griffe: string;

  @ApiProperty()
  stock: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'Insira o valor original' })
  price: number;

  @ApiProperty()
  @IsOptional()
  discount: number;

  @ApiProperty()
  @IsOptional()
  finalPrice: number;
}
