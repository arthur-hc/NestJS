import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsEmailAlreadyUsed } from '../decorators/unique-email.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is invalid' })
  @IsEmailAlreadyUsed({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
