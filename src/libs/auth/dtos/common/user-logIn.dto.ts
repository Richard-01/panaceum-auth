import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLogInDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ description: 'password should be', minimum: 8, maximum: 70 })
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be minimmum 8 ' })
  @MaxLength(50, { message: 'password should be maximium 70 ' })
  password: string;
}
