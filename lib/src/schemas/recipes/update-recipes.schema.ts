import { IsNumber, IsString } from "class-validator";

export class UpdateRecipe {
    @IsString()
    id!: string;

    @IsString()
    title!: string;
  
    @IsString()
    description!: string;
  
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
}
