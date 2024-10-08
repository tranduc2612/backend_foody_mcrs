import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  APP: {
    GATEWAY: {
      PORT: +process.env.GATEWAY_PORT || 3000,
      HOST: process.env.GATEWAY_HOST || 'localhost',
    },
    USER_SERVICE: {
      PORT: +process.env.USER_SERVICE_PORT || 3002,
      HOST: process.env.USER_SERVICE_HOST || 'localhost',
    },
    RECIPES_SERVICE: {
      PORT: +process.env.RECIPES_SERVICE_PORT || 3003,
      HOST: process.env.RECIPES_SERVICE_HOST || 'localhost',
    },
  }
};
