import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipe, GetListRecipes, Recipes, RecipesDTO, RecipesType, TCP_MESSAGES, TCP_SERVICES_KEYS, UpdateRecipe, UserDTO } from 'lib';
import { RpcBadRequestException } from 'src/exceptions/custom-rpc-exceptions';
import { transformRequest } from 'src/utils/request.helper';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(RecipesType)
    private readonly recipesTypeRepository: Repository<RecipesType>,
    @Inject(TCP_SERVICES_KEYS.USER_SERVICE_KEY) private clientUser: ClientProxy,
  ) {}

  async gets(req: GetListRecipes): Promise<any> {
    try {
      
      req.pageIndex = Number(req.pageIndex);
      req.pageCount = Number(req.pageCount);
      
      if(!req.pageCount || !req.pageIndex){
        throw new RpcBadRequestException('page index or page count is invalid !');
      }
  
      if(req.pageIndex <= 0){
        req.pageIndex = 1;
      }
  
      if(req.pageCount <= 0){
        req.pageCount = 10;
      }
  
      const [data, total] = await this.recipesRepository.findAndCount({
        where: {isDelete: false},
        skip: (req.pageIndex - 1) * req.pageCount,
        take: req.pageCount,
      })
  
      const userIds = data.map((recipe) => recipe.createdBy);
  
      const users = await transformRequest<UserDTO[]>(this.clientUser,TCP_MESSAGES.USER_SERVICE.GET_LIST_USER_BY_LIST_ID, userIds);
  
      const recipes = data.map((recipe: Recipes) => {
        const user = users.find((u) => u.username === recipe.createdBy);
        return {
          ...recipe,
          user: user,
        };
      });
  
      return {
        recipes,
        total
      };
    } catch (error) {
      throw new RpcBadRequestException(error);
    }

  }

  async getRecipeTypes(): Promise<any> {
    const recipeTypes = await this.recipesTypeRepository.find();
    return recipeTypes;
  }

  async create(req: CreateRecipe): Promise<RecipesDTO> {
    try {
      const newRecipe = this.recipesRepository.create({
        ...req,
        imageTitle: '',
        createdAt: new Date(),
      });
      const data = await this.recipesRepository.save(newRecipe)
      
      return data
    } catch (error) {
      throw new RpcBadRequestException(error.sqlMessage);
    }
    
  }

  async update(req: UpdateRecipe): Promise<boolean> {
    await this.recipesRepository.update({id: req.id}, req);
    return true
  }

  async delete(payload): Promise<boolean> {
    const find = await this.recipesRepository.findOne({where: payload});
    if(find){
      await this.recipesRepository.update({id: find.id}, {isDelete: true});
      return true
    }
    throw new RpcBadRequestException('The recipes is not exist !');

  }
}
