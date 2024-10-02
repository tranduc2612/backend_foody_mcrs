import {
  Body,
  Controller
} from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { CreateUserDto, TCP_MESSAGES } from 'lib';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: TCP_MESSAGES.USER_SERVICE.GET_USER}, Transport.TCP)
   getUser(@Body() payload) {
    return this.userService.get(payload.username); 
  }
  @MessagePattern({cmd: TCP_MESSAGES.USER_SERVICE.CREATE_USER}, Transport.TCP)
  createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data);  
  }
}
