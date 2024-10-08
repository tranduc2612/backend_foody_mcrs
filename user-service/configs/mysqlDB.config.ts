import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Recipes, Users } from 'lib';

export const TypeOrmConFig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST') || 'localhost',
    port: +configService.get('DB_PORT') || 3306,
    username: configService.get('DB_USERNAME') || 'root',
    password: configService.get('DB_PASSWORD') || '123456',
    database: configService.get('DB_DATABASE') || 'foody_db',
    entities: [Users,Recipes],
    synchronize: true,
  }),
  inject: [ConfigService],
};
