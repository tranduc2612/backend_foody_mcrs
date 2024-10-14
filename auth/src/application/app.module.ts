import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Users
} from 'lib';
import { env } from 'src/configs/env.config';
import { TypeOrmConFig } from 'src/configs/mysqlDB.config';
import { LocalStrategy } from 'src/utils/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConFig),
    TypeOrmModule.forFeature([
      Users
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
