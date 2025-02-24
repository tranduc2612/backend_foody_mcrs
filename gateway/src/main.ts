import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'src/configs/env.config';
import { AppModule } from './modules/application/app.module';
import { exceptionRequestFactory } from './utils/request.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      cors: {
        origin: 'http://localhost:8080',
        credentials: true,
      },
    }
  );
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: exceptionRequestFactory,
  }));
  await app.listen(env.APP.GATEWAY.PORT);
  console.log(`gateway listen port ${env.APP.GATEWAY.PORT} ...`) 

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

