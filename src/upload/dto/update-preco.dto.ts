import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class updateTableDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  code: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  collection: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  griffe: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  discount: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  finalPrice: number;
}
