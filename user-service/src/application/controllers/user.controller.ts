import {
  Body,
  Controller
} from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { CreateUser, TCP_MESSAGES } from 'lib';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: TCP_MESSAGES.USER_SERVICE.GET_USER}, Transport.TCP)
   getUser(@Body() payload) {
    return this.userService.get(payload.username); 
  }

  @MessagePattern({cmd: TCP_MESSAGES.USER_SERVICE.GET_LIST_USER_BY_LIST_ID}, Transport.TCP)
   getUserByListIds(@Body() payload) {
    return this.userService.get(payload.username); 
  }
}
