import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'src/configs/env.config';
import { AwsModule } from './application/app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AwsModule);
  const app = await NestFactory.create(AwsModule,
    {
      cors: {
        origin: 'http://localhost:8080',
        credentials: true,
      },
    }
  );
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: env.APP.GATEWAY.HOST,
      port: env.APP.GATEWAY.PORT,
    },
  });
  // await app.startAllMicroservices();
  await app.listen(env.APP.AWS_SERVICE.PORT);
  console.log('listen port ' + env.APP.AWS_SERVICE.PORT + '...');

  const gracefulShutdown = (): void => {
    console.log('Shutting down gracefully...')
    
    app.close()
    
    // Force close the server after 5 seconds
    setTimeout(() => {
      console.error(
        'Could not close connections in time, forcefully shutting down',
      )
        process.exit(1)
      }, 5000)
  }
    
  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)
}
bootstrap();
