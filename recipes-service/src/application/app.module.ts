import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConFig } from 'configs/mysqlDB.config';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { CommentRecipes, Country, DetailRecipes, Merchandise, Recipes, RecipesType, Season, Step, TCP_SERVICES_KEYS, Users, RateDetail } from 'lib';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'configs/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConFig),
    TypeOrmModule.forFeature([
      Recipes,
      CommentRecipes,
      Step,
      Country,
      DetailRecipes,
      Merchandise,
      RecipesType,
      RateDetail,
      Season,
    ]),
    ClientsModule.register([
      {
        name: TCP_SERVICES_KEYS.USER_SERVICE_KEY,
        transport: Transport.TCP,
        options: {
          host: env.APP.USER_SERVICE.HOST,
          port: env.APP.USER_SERVICE.PORT,
        },
      },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class AppModule {}
