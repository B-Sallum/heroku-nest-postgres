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
  griffe: string;

  @IsOptional()
  stock: boolean;

  @IsOptional()
  active: boolean;

  @IsOptional()
  price: number;

  @IsOptional()
  discount: number;

  @IsOptional()
  finalPrice: number;
}
