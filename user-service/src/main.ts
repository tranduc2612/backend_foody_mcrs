import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'src/configs/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: env.APP.USER_SERVICE.HOST,
      port: env.APP.USER_SERVICE.PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(env.APP.USER_SERVICE.PORT);
  console.log('listen port ' + env.APP.USER_SERVICE.PORT + '...');
}
bootstrap();
