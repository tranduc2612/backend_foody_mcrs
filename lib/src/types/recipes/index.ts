import { UserDTO } from "../user";

export interface RecipesDTO {
  id: string;
  title: string;
  description: string;
  imageTitle: string;
  calories: number;
  sodium: number;
  fat: number;
  carbs: number;
  fiber: number;
  timeCook: number;
  createdAt: Date;
  createdBy: string;
  isDelete: boolean;
  users?: UserDTO
}
