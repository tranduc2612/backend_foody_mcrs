import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'src/configs/env.config';
import { TypeOrmConFig } from 'src/configs/mysqlDB.config';
import { CommentRecipes, Country, DetailRecipes, Merchandise, Recipes, RecipesType, Season, Step, TCP_SERVICES_KEYS } from 'lib';
import { CountryController } from './controllers/country.controller';
import { RecipesController } from './controllers/recipes.controller';
import { SeasonController } from './controllers/season.controller';
import { CountryService } from './services/country.service';
import { RecipesService } from './services/recipes.service';
import { SeasonService } from './services/season.service';

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
  controllers: [RecipesController,SeasonController,CountryController],
  providers: [RecipesService,SeasonService,CountryService],
})
export class AppModule {}
