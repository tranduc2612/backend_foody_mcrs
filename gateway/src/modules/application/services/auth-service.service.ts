import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthUserDto, TCP_MESSAGES, TCP_SERVICES_KEYS, UserDTO, CreateUserDto } from 'lib';
import { transformRequest } from 'src/utils/request.helper';

@Injectable()
export class AuthService {
  constructor(@Inject(TCP_SERVICES_KEYS.AUTH_SERVICE_KEY) private client: ClientProxy) {}

  async login(payload: AuthUserDto) {
    return transformRequest<UserDTO>(this.client,TCP_MESSAGES.AUTH_SERVICE.LOGIN_USER,{
		...payload
	})
  }


  async register(payload: CreateUserDto) {
    return transformRequest<UserDTO>(this.client,TCP_MESSAGES.AUTH_SERVICE.REGISTER_USER,{
		...payload
	})
  }

  async refreshToken(payload) {
    return transformRequest<UserDTO>(this.client,TCP_MESSAGES.AUTH_SERVICE.REFRESH_TOKEN,{
		...payload
	})
  }

  async demoService() {
    return transformRequest<any>(this.client,'demo')
  }
}
