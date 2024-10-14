import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConFig } from 'configs/mysqlDB.config';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { Users } from 'lib';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConFig),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class AppModule {}
