import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConFig } from 'src/configs/mysqlDB.config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/utils/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/configs/env.config';
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
} from 'lib';
import { CartDetail } from 'lib/dist/typeorm/cart_detail.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConFig),
    TypeOrmModule.forFeature([
      Users,
      CommentRecipes,
      Step,
      Country,
      DetailRecipes,
      Merchandise,
      RecipesType,
      Season,
      CartDetail
    ]),
    JwtModule.register({
      secret: env.APP.SECRET_KEY_ACCESS_TOKEN,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AppModule {}
