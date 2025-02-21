import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  APP: {
    GATEWAY: {
      PORT: +process.env.GATEWAY_PORT || 3000,
      HOST: process.env.GATEWAY_HOST || 'localhost',
    },
    AWS_SERVICE: {
      PORT: +process.env.STORAGE_SERVICE_PORT || 7000,
      HOST: process.env.STORAGE_SERVICE_HOST || 'localhost',
    }
  }
};
