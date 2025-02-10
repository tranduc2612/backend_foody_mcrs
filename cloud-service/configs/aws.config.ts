import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  },
});

export default s3;
