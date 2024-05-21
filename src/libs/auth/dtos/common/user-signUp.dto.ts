import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
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

  @ApiProperty({ description: 'User password', example: 'Password123*s' })
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be minimmum 8' })
  @MaxLength(50, { message: 'password should be maximium 50' })
  password: string;

  @ApiProperty({ description: 'User role', example: 'ADMIN' })
  role?: string;

  @ApiProperty({ description: 'Date of birth of the user', example: '1990-01-14' })
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;
  
  @ApiProperty({ description: 'Type of identification', example: 'Passport' })
  @IsNotEmpty()
  @IsString()
  typeId: string;
  
  @ApiProperty({ description: 'Identification number,ID must be unique', example: '123456789' })
  @IsNotEmpty()
  @IsString()
  readonly Id: string;
}
