import { IsString, IsNumber } from 'class-validator';

export class Log {
  @IsNumber()
  user_id: number;

  @IsString()
  product_id: string;

  @IsString()
  alter_field: string;

  @IsNumber()
  original: number;

  @IsNumber()
  new: number;
}
