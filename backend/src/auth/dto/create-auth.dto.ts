import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'username must be required' })
  user_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email must be required' })
  pmail_address: string;

  @IsNotEmpty({ message: 'password must be required' })
  user_password: string;

  @IsNotEmpty({ message: 'phone number must be required' })
  uspo_number: string;

  usro_role_id: string;
}

export class SignInDto {
  @IsNotEmpty({ message: 'username or email must be required' })
  usernameOrEmail: string;

  @IsNotEmpty({ message: 'password must be required' })
  password: any;
}
