import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class updateTableDto {
  @IsString()
  @ApiProperty()
  code: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  discount: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  finalPrice: number;
}
