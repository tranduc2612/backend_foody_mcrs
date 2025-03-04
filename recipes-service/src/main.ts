import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'src/configs/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: env.APP.RECIPES_SERVICE.HOST,
      port: env.APP.RECIPES_SERVICE.PORT,
    },
  });
  await app.startAllMicroservices();
  // await app.listen(env.APP.RECIPES_SERVICE.PORT);
  console.log('listen port ' + env.APP.RECIPES_SERVICE.PORT + '...');

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
