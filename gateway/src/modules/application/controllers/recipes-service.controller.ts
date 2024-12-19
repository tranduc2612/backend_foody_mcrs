import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreateRecipe, GetListRecipes, UpdateRecipe } from 'lib';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { RecipesService } from '../services/recipes-serice.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

// @UseGuards(AuthGuard)
// @Controller('applications/cascade')
// @ApiTags('Cascade Apis')
@Controller('recipes')
@UseInterceptors(new TransformInterceptor())
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  getListRecipes(@Query() query: GetListRecipes) {
    return this.recipesService.getList(query);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  createRecipes(@Body() req: CreateRecipe) {
    return this.recipesService.createRecipe(req);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  updateRecipes(@Body() req: UpdateRecipe) {
    return this.recipesService.updateRecipe(req);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  deleteRecipes(@Param() { id }) {
    return this.recipesService.deleteRecipe(id);
  }
}
