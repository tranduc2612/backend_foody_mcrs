import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthUserDto, convertStringToDate, CreateUserDto, ErrorType, RegisterDTO, ROLE, Users } from 'lib';
import { RpcBadRequestException, RpcUnAuthorizeException } from 'src/exceptions/custom-rpc-exceptions';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async authentication({ username, password }: AuthUserDto) {
    const dataUser = await this.validateUser(username, password);

    if (dataUser) {
      const token = this.createToken(dataUser);
      return {
        ...dataUser,
        ...token,
      };
    }

    throw new RpcBadRequestException('The username is not exist !');
  }

  async registration({ username, password, email, DOB, role }: CreateUserDto) {
    const dataUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (dataUser) {
      const error: ErrorType = {
        field: 'username',
        errors: ['The username is already exist !']
      }
      throw new RpcBadRequestException('',[error]);
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRepository.create({
      id: uuidv4(),
      username,
      password: hashedPassword,
      email,
      DOB: convertStringToDate(DOB),
      role: role || ROLE.USER
    });

    const user = await this.userRepository.save(newUser);
    return user;
  }

  createToken(payload): { accessToken: string; refreshToken: string } {
    const { accessToken, refreshToken, exp, ...data } = payload;
    const newAccessToken = this.jwtService.sign(data);
    const newRefreshToken = jwt.sign(
      data,
      process.env.SECRET_KEY_REFRESH_TOKEN,
      {
        expiresIn: '7d',
      },
    );

    const token = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    this.userRepository.update(data.id, {
      ...token,
    });

    return token;
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
    } catch (err) {
      return null;
    }
  }

  async refreshToken(refreshToken: string) {
    const refreshData = this.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findOne({
      where: {
        username: refreshData.username,
        refreshToken
      },
    });

    if (!refreshData || !user) {
      throw new RpcUnAuthorizeException('Refresh token is invalid !');
    }

    
    const token = this.createToken(user);
    return {
      ...user,
      ...token,
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    // So sánh mật khẩu đã mã hóa
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...data } = user;
      return data;
    }

    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
