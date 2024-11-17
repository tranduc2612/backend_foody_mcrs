import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { CreateRecipe, GetListRecipes, TCP_MESSAGES, UpdateRecipe } from 'lib';
import { RecipesService } from '../services/recipes.service';

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_RECIPES },
    Transport.TCP,
  )
  getListRecipes(@Body() payload: GetListRecipes) {
    return this.recipesService.gets(payload);
  }

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.CREATE_RECIPES },
    Transport.TCP,
  )
  createRecipes(@Body() payload: CreateRecipe) {
    return this.recipesService.create(payload);
  }

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.UPDATE_RECIPES },
    Transport.TCP,
  )
  updateRecipes(@Body() payload: UpdateRecipe) {
    return this.recipesService.update(payload);
  }

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.DELETE_RECIPES },
    Transport.TCP,
  )
  deleteRecipes(@Body() payload) {
    return this.recipesService.delete(payload);
  }
}
