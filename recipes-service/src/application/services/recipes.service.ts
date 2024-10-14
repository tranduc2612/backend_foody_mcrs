import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcBadRequestException } from 'exceptions/custom-rpc-exceptions';
import { CreateRecipe, GetListRecipes, Recipes, RecipesDTO, TCP_MESSAGES, TCP_SERVICES_KEYS, UserDTO } from 'lib';
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
    const recipes = await this.recipesRepository.find();

    // Bước 2: Lấy danh sách user ID liên quan từ danh sách sản phẩm
    const userIds = recipes.map((recipe) => recipe.createdBy);

    // Bước 3: Gọi User Service để lấy thông tin user tương ứng
    const users = await transformRequest<UserDTO[]>(this.clientUser,TCP_MESSAGES.USER_SERVICE.GET_LIST_USER_BY_LIST_ID,{ userIds });

    // Bước 4: Hợp nhất thông tin sản phẩm với thông tin người dùng
    const productsWithUsers = recipes.map((recipe: Recipes) => {
      const user = users.find((u) => u.username === recipe.createdBy);
      return {
        ...recipe,
        user: user,
      };
    });

    return productsWithUsers;

    // throw new RpcBadRequestException('The username is not exist !');
  }

  async create(req: CreateRecipe): Promise<any> {
    const newRecipe = this.recipesRepository.create({
      ...req,
      createdAt: new Date(), // Đặt ngày tạo là hiện tại
    });

    this.recipesRepository.save(newRecipe)

    return newRecipe

    // throw new RpcBadRequestException('The username is not exist !');
  }
}
