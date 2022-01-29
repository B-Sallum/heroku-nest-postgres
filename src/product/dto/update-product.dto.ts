import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  nome: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  colecao: string;

  @IsOptional()
  griffe: string;

  @IsOptional()
  estoque: boolean;

  @IsOptional()
  ativo: boolean;

  @IsOptional()
  preco: number;

  @IsOptional()
  desconto: number;

  @IsOptional()
  precofinal: number;
}
