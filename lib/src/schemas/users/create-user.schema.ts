import { IsDate, IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUser{
  @IsString()
  @IsNotEmpty({message: 'The username is required'})
  @MinLength(3, {
    message: "The username is at least 3 character"
  })
  @MaxLength(20, {
      message: "The username must not exceed 20 characters"
  })
  username!: string;

  @IsEmail({}, { message: 'the email is invalid' })
  email!: string;

  @IsString({ message: 'The date of birth is invalid' })
  DOB!: string;

  @IsIn(['ADMIN', 'USER'], { message: 'The role is ADMIN or USER' })
  role!: string;

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
