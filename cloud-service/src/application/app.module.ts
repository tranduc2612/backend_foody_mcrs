import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AwsController } from './controller/aws.controller';
import { AwsService } from './services/aws.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    })
  ],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AwsModule {}
