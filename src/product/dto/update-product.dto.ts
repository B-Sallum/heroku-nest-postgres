import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  code: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  collection: string;

  @IsOptional()
  griffe: boolean;

  @IsOptional()
  stock: boolean;

  @IsOptional()
  active: number;

  @IsOptional()
  price: number;

  @IsOptional()
  discount: number;

  @IsOptional()
  finalPrice: number;
}
