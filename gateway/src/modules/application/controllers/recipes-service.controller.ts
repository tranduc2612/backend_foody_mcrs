import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserService } from '../services/user-service.service';
import { RecipesService } from '../services/recipes-serice.service';
import { CreateRecipe, GetListRecipes } from 'lib';

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
