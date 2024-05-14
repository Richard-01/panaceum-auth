import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  
  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'User password', example: 'Password123' })
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be minimmum 8' })
  @MaxLength(50, { message: 'password should be maximium 50' })
  password: string;

  @ApiProperty({ description: 'User role', example: 'ADMIN' })
  @IsNotEmpty()
  role: string;
}
