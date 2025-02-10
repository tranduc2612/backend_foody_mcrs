import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AwsService } from '../services/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.getHello();
  }
}
