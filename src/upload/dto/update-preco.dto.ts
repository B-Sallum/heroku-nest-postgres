import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class editPrecoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  PRODUTO: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  CODIGO_TAB_PRECO: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ID_CAMPO_ALTERADO: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  VALOR_NOVO: string;
}
