import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRecipe,
  GetListRecipes,
  RecipesDTO,
  RecipesType,
  TCP_MESSAGES,
  TCP_SERVICES_KEYS,
  UpdateRecipe
} from 'lib';
import { transformRequest } from 'src/utils/request.helper';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(TCP_SERVICES_KEYS.RECIPES_SERVICE_KEY) private client: ClientProxy,
  ) {}

  async getList(payload: GetListRecipes) {
    return transformRequest<RecipesDTO>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_RECIPES,
      {
        ...payload,
      },
    );
  }

  async getListRecipeTypes() {
    return transformRequest<RecipesType>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_TYPE_RECIPES,
      {
      },
    );
  }

  async createRecipe(payload: CreateRecipe) {
    return transformRequest<RecipesDTO>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.CREATE_RECIPES,
      {
        ...payload,
      },
    );
  }

  async updateRecipe(payload: UpdateRecipe) {
    return transformRequest<RecipesDTO>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.UPDATE_RECIPES,
      {
        ...payload,
      },
    );
  }

  async deleteRecipe(id: string) {
    return transformRequest<RecipesDTO>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.DELETE_RECIPES,
      {
        id,
      },
    );
  }
}
