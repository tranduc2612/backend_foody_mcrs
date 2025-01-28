import { IsNumber, IsString } from "class-validator";

export class CreateRecipe {
    @IsString()
    title!: string;
  
    @IsString()
    description!: string;

    @IsString()
    imageTitle!: string;
  
    @IsNumber()
    calories!: number;
  
    @IsNumber()
    sodium!: number;
  
    @IsNumber()
    fat!: number;
  
    @IsNumber()
    carbs!: number;
  
    @IsNumber()
    fiber!: number;
  
    @IsNumber()
    timeCook!: number;

    @IsString()
    createdBy!: string;
}
