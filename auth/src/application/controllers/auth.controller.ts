import {
  Body,
  Controller
} from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { AuthUserDto, CreateUserDto, TCP_MESSAGES } from 'lib';
import { AuthService } from '../services/auth.service';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @MessagePattern({ cmd: TCP_MESSAGES.AUTH_SERVICE.LOGIN_USER }, Transport.TCP)
  login(@Body() payload: AuthUserDto) {
    const { username, password } = payload;
    if (username && password) {
      return this.authService.authentication(payload);
    }
  }

  @MessagePattern(
    { cmd: TCP_MESSAGES.AUTH_SERVICE.REGISTER_USER },
    Transport.TCP,
  )
  register(@Body() payload: CreateUserDto) {
    const { username, password } = payload;
    if (username && password) {
      return this.authService.registration(payload);
    }
  }

  @MessagePattern(
    { cmd: TCP_MESSAGES.AUTH_SERVICE.REFRESH_TOKEN },
    Transport.TCP,
  )
  refreshToken(@Body() token: { refreshToken: string }) {
    const {refreshToken} = token;
    return this.authService.refreshToken(refreshToken);
  }
}
