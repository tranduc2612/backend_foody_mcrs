
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcBadRequestException } from 'exceptions/custom-rpc-exceptions';
import { CreateUserDto, UserDTO, Users } from 'lib';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
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
        username: data.username,
        email: data.email,
      }
  
      return {
        ...dataMapper
      };
    }

    throw new RpcBadRequestException('The username is not exist !');
    
  }

  async create(dto: CreateUserDto): Promise<UserDTO> {
    const newUser = await this.userRepository.create({
      ...dto,
    });

    const data = await this.userRepository.save(newUser);

    if(data){
      const dataMapper: UserDTO = {
        username: data.username,
        email: data.email
      }

      return {
        ...dataMapper
      };
     
    }
    return null
    
  }
}
