import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../constants/interfaces/roles-users.enum';


export class CreateUserDto {
    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ description: 'Type of identification', example: 'Passport' })
    @IsNotEmpty()
    @IsString()
    typeId?: string;

    @ApiProperty({ description: 'Identification number', example: '12345678' })
    @IsNotEmpty()
    @IsString()
    Id?: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Date of birth of the user', example: '1990-01-01' })
    @IsDate()
    @IsNotEmpty()
    dateOfBirth?: string;

    @ApiProperty({ description: 'User password', example: 'Password123' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'User role', example: 'ADMIN' })
    @IsEnum(UserRole)
    @IsNotEmpty()
    role?: UserRole;
}