import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  APP: {
    SECRET_KEY_ACCESS_TOKEN: process.env.SECRET_KEY_ACCESS_TOKEN,
    SECRET_KEY_REFRESH_TOKEN: process.env.SECRET_KEY_REFRESH_TOKEN,
    GATEWAY: {
      PORT: +process.env.GATEWAY_PORT || 3000,
      HOST: process.env.GATEWAY_HOST || 'localhost',
    },
    USER_SERVICE: {
      PORT: +process.env.USER_SERVICE_PORT || 3002,
      HOST: process.env.USER_SERVICE_HOST || 'localhost',
    },
    AUTH_SERVICE: {
      PORT: +process.env.AUTH_SERVICE_PORT || 3001,
      HOST: process.env.AUTH_SERVICE_HOST || 'localhost',
    },
  }
};
