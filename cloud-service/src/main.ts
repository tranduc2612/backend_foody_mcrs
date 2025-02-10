import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'configs/env.config';
import { AwsModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AwsModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: env.APP.AWS_SERVICE.HOST,
      port: env.APP.AWS_SERVICE.PORT,
    },
  });
  // await app.startAllMicroservices();
  await app.listen(env.APP.AWS_SERVICE.PORT);
  console.log('listen port ' + env.APP.AWS_SERVICE.PORT + '...');
}
bootstrap();
