import { IsString } from 'class-validator';

export class AuthUserDto{
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
