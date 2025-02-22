import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserService } from './services/user-service.service';
import { UserController } from './controllers/user-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TCP_SERVICES_KEYS } from 'lib';
import { env } from 'src/configs/env.config';
import { AuthController } from './controllers/auth-service.controller';
import { AuthService } from './services/auth-service.service';
import { JwtModule } from '@nestjs/jwt';
import { RecipesService } from './services/recipes-serice.service';
import { RecipesController } from './controllers/recipes-service.controller';
import { CommonController } from './controllers/common-service.controller';
import { CommonService } from './services/common-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: TCP_SERVICES_KEYS.USER_SERVICE_KEY,
        transport: Transport.TCP,
        options: {
          host: env.APP.USER_SERVICE.HOST,
          port: env.APP.USER_SERVICE.PORT,
        },
      },
      {
        name: TCP_SERVICES_KEYS.AUTH_SERVICE_KEY,
        transport: Transport.TCP,
        options: {
          host: env.APP.AUTH_SERVICE.HOST,
          port: env.APP.AUTH_SERVICE.PORT,
        },
      },
      {
        name: TCP_SERVICES_KEYS.RECIPES_SERVICE_KEY,
        transport: Transport.TCP,
        options: {
          host: env.APP.RECIPES_SERVICE.HOST,
          port: env.APP.RECIPES_SERVICE.PORT,
        },
      },
    ]),
    JwtModule.register({
      secret: env.APP.SECRET_KEY_ACCESS_TOKEN,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController, RecipesController, CommonController],
  providers: [UserService, AuthService, RecipesService, CommonService],
})
export class AppModule {}
