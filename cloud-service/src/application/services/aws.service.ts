import { GetObjectCommand, PutObjectAclCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Body } from '@nestjs/common';
import s3 from 'configs/aws.config';
import { randomUUID } from 'crypto';
import streamToString from 'stream-to-string';

@Injectable()
export class AwsService {
  _storageS3: S3Client;
  private readonly bucketName = 'foody-storage-demo';

  constructor(){
    this._storageS3 = s3;
  }

  async upload(file: Express.Multer.File){
    const v4 = randomUUID();
    const params = {
      Bucket: this.bucketName,
      Key: v4,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      await this._storageS3.send(new PutObjectCommand(params));
    } catch (error) {
      throw new Error('No content found in S3 object');
    }
    return `https://${this.bucketName}.s3.amazonaws.com/${v4}`;
  }

  async getFile(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const response = await this._storageS3.send(command);
    if (response.Body) {
      // Convert stream to string
      const bodyString = await streamToString(response.Body as NodeJS.ReadableStream);
      // console.log(response.Body);
    
      return bodyString;
    } else {
      throw new Error('No content found in S3 object');
    }
  }
}
