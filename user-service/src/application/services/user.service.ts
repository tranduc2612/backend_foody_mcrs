
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcBadRequestException } from 'src/exceptions/custom-rpc-exceptions';
import { CreateUser, UserDTO, Users } from 'lib';
import { In, Repository } from 'typeorm';
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

  // Lấy danh sách User dựa trên mảng username
  async getUsersByListId(usernames: string[]): Promise<UserDTO[]> {
    // Tìm các user có username nằm trong danh sách username[]
    const users = await this.userRepository.find({
      where: {
        username: In(usernames), // Sử dụng mệnh đề In của TypeORM để tìm trong danh sách username
      },
    });

    // Chuyển đổi kết quả sang DTO (nếu cần)
    return users.map(user => this.toUserDTO(user))
  }

  // Chuyển User entity thành UserDTO
  private toUserDTO(user: Users): UserDTO {
    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      DOB: user.DOB,
      createdAt: user.createdAt
    };
  }
}
