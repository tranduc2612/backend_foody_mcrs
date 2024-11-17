import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CartDetail, CommentRecipes, Country, DetailRecipes, Merchandise, Order, OrderDetail, Recipes, RecipesType, Season, Step, Users } from 'lib';

export const TypeOrmConFig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST') || '127.0.0.1',
    port: +configService.get('DB_PORT') || 3306,
    username: configService.get('DB_USERNAME') || 'root',
    password: configService.get('DB_PASSWORD') || '123456',
    database: configService.get('DB_DATABASE') || 'foody_recipes',
    entities: [
      Recipes,
      CommentRecipes,
      Step,
      Country,
      DetailRecipes,
      Merchandise,
      RecipesType,
      Season
    ],
    synchronize: true,
  }),
  inject: [ConfigService],
};
