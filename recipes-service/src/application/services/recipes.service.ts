import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcBadRequestException } from 'exceptions/custom-rpc-exceptions';
import { CreateRecipe, GetListRecipes, Recipes, RecipesDTO, TCP_MESSAGES, TCP_SERVICES_KEYS, UpdateRecipe, UserDTO } from 'lib';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { transformRequest } from 'utils/request.helper';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @Inject(TCP_SERVICES_KEYS.USER_SERVICE_KEY) private clientUser: ClientProxy,
  ) {}

  async gets(req: GetListRecipes): Promise<any> {
    // Bước 1: Lấy danh sách sản phẩm từ cơ sở dữ liệu
    // const recipes = await this.recipesRepository.find();

    if(req.pageIndex <= 0){
      req.pageIndex = 1;
    }

    if(req.pageCount <= 0){
      req.pageCount = 10;
    }

    const [data, total] = await this.recipesRepository.findAndCount({
      skip: (req.pageIndex - 1) * req.pageCount,
      take: req.pageCount,
    })

    // Bước 2: Lấy danh sách user ID liên quan từ danh sách sản phẩm
    const userIds = data.map((recipe) => recipe.createdBy);

    // Bước 3: Gọi User Service để lấy thông tin user tương ứng
    const users = await transformRequest<UserDTO[]>(this.clientUser,TCP_MESSAGES.USER_SERVICE.GET_LIST_USER_BY_LIST_ID, userIds);

    // Bước 4: Hợp nhất thông tin sản phẩm với thông tin người dùng
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

    // throw new RpcBadRequestException('The username is not exist !');
  }

  async create(req: CreateRecipe): Promise<RecipesDTO> {
    const newRecipe = this.recipesRepository.create({
      ...req,
      createdAt: new Date(), // Đặt ngày tạo là hiện tại
    });

    // const { , ...data} = newRecipe

    const newRecipeDTO: RecipesDTO = {
      id: newRecipe.id,
      title: newRecipe.title,
      description: newRecipe.description,
      calories: newRecipe.calories,
      sodium: newRecipe.calories,
      fat: newRecipe.calories,
      carbs: newRecipe.calories,
      fiber: newRecipe.calories,
      timeCook: newRecipe.calories,
      createdAt: undefined,
      createdBy: '',
      users: undefined
    }

    this.recipesRepository.save(newRecipe)

    return newRecipeDTO
  }

  async update(req: UpdateRecipe): Promise<any> {
    // const updateRecipe = this.recipesRepository.update({
    //   ...req
    // });

    // this.recipesRepository.save(updateRecipe)

    // return updateRecipe
  }
}
