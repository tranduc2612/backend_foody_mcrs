import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto{
  @IsString()
  @MinLength(3, { message: 'Tên phải có ít nhất 3 ký tự' })
  username!: string;

  @IsEmail({}, { message: 'Email không hợp lệ 2' })
  email!: string;

  @IsString()
  password!: string;
}
