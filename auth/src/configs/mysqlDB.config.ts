import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import {
  Recipes,
  Users,
  Step,
  Country,
  DetailRecipes,
  Merchandise,
  RecipesType,
  Season,
  CommentRecipes,
  CartDetail,
  Order,
  OrderDetail
} from 'lib';

export const TypeOrmConFig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST') || '127.0.0.1',
    port: +configService.get('DB_PORT') || 3306,
    username: configService.get('DB_USERNAME') || 'root',
    password: configService.get('DB_PASSWORD') || '123456',
    database: configService.get('DB_DATABASE') || 'foody_db',
    entities: [
      Users,
      Recipes,
      CommentRecipes,
      Step,
      Country,
      DetailRecipes,
      Merchandise,
      RecipesType,
      Season,
      CartDetail,
      Order,
      OrderDetail
    ],
    synchronize: true,
  }),
  inject: [ConfigService],
};
