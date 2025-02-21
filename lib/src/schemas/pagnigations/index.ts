import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class Pagnigation{
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageCount!: number | string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageIndex!: number | string;
}
