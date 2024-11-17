import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUser{
  @IsString()
  @IsNotEmpty({message: 'không được để trống !'})
  @MinLength(3, {
    message: "Tên tài khoản quá ngắn"
  })
  @MaxLength(20, {
      message: "Tên tài khoản quá dài"
  })
  username!: string;

  @IsString()
  @IsNotEmpty({message: 'không được để trống !'})
  @MinLength(3, {
    message: "Tên mật khẩu quá ngắn"
  })
  @MaxLength(20, {
      message: "Tên mật khẩu quá dài"
  })
  password!: string;
}
 