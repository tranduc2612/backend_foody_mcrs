import {
  Body,
  Controller
} from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { TCP_MESSAGES } from 'lib';
import { RecipesService } from '../services/recipes.service';

@Controller()
export class RecipesController {
  constructor(private readonly userService: RecipesService) {}

  @MessagePattern({cmd: TCP_MESSAGES.USER_SERVICE.GET_USER}, Transport.TCP)
   getUser(@Body() payload) {
    return this.userService.get(payload.username); 
  }
}
