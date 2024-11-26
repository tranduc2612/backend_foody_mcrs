import { IsNumber, IsString } from 'class-validator';

export class Pagnigation{
  @IsNumber()
  pageCount!: number;

  @IsNumber()
  pageIndex!: number;
}
