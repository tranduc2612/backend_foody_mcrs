import { IsString } from "class-validator";
import { Pagnigation } from "../pagnigations";

export class GetListRecipes extends Pagnigation {
  @IsString()
  nameRecipes!: string;
}
