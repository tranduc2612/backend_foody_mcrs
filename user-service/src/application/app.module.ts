import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConFig } from 'configs/mysqlDB.config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Recipes, Users } from 'lib';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConFig),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
