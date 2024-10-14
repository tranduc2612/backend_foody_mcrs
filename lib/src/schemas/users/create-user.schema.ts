import { IsDate, IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class CreateUser{
  @IsString()
  @MinLength(3, { message: 'Tên phải có ít nhất 3 ký tự' })
  username!: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @IsString({ message: 'Ngày tháng không hợp lệ' })
  DOB!: string;

  @IsIn(['ADMIN', 'USER'], { message: 'Vai trò phải là ADMIN hoặc USER' })
  role!: string;

  @IsString()
  password!: string;
}
