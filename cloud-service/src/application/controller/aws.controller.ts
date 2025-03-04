import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AwsService } from '../services/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.upload(file);
  }

  @Get('file/:key')
  async getFile(@Param('key') key: string) {
    return this.awsService.getFile(key);
  }
}
``