import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty()
  code: string;

  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty()
  collection: string;

  @IsOptional()
  @ApiProperty()
  griffe: string;

  @IsOptional()
  @ApiProperty()
  stock: boolean;

  @IsOptional()
  @ApiProperty()
  active: boolean;

  @IsOptional()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiProperty()
  discount: number;

  @IsOptional()
  @ApiProperty()
  finalPrice: number;
}
