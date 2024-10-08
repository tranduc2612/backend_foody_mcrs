
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcBadRequestException } from 'exceptions/custom-rpc-exceptions';
import { CreateUserDto, UserDTO, Users } from 'lib';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async get(username: string): Promise<UserDTO> {
    const data = await this.userRepository.findOne({
      where: {
        username, 
      },
    });

    if(data){
      const dataMapper: UserDTO = {
        id: data.id,
        username: data.username,
        email: data.email,
      }
  
      return {
        ...dataMapper
      };
    }

    throw new RpcBadRequestException('The username is not exist !');
    
  }
}
