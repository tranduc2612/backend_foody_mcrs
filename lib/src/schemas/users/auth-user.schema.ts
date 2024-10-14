import { IsString } from 'class-validator';

export class AuthUser{
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
