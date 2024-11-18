import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUser{
  @IsString()
  @IsNotEmpty({message: 'The username is required'})
  @MinLength(3, {
    message: "The username is at least 3 character"
  })
  @MaxLength(20, {
      message: "The username must not exceed 20 characters"
  })
  username!: string;

  @IsString()
  @IsNotEmpty({message: 'The password is required'})
  @MinLength(3, {
    message: "The password is at least 3 character"
  })
  @MaxLength(20, {
      message: "The password must not exceed 20 characters"
  })
  password!: string;
}
 