import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CreateRecipe, GetListRecipes } from 'lib';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { RecipesService } from '../services/recipes-serice.service';

// @UseGuards(AuthGuard)
// @Controller('applications/cascade')
// @ApiTags('Cascade Apis')
@Controller('recipes')
@UseInterceptors(new TransformInterceptor())
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('list')
  // @UseGuards(AuthGuard)
  getListRecipes(@Body() req: GetListRecipes) {
    return this.recipesService.getList(req);
  }

  @Post('create')
  // @UseGuards(AuthGuard)
  createRecipes(@Body() req: CreateRecipe) {
    return this.recipesService.createRecipe(req);
  }
}
