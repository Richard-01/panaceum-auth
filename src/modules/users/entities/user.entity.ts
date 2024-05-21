import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';
import { Document } from 'mongoose';
import { UserRole } from '../constants/interfaces/roles-users.enum';


@Schema({ timestamps: true })
export class User extends Document {
    
    @IsNotEmpty()
    @Prop({ required: true})
    @Length(10, 50)
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsNotEmpty()
    @Prop({ required: true})
    @IsString()
    typeId: string;

    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    @Length(6, 100)
    @IsString()
    Id: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password too weak. It must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long.',
    })
    password: string;

    @Prop({ default: UserRole.PATIENT })
    @IsNotEmpty()
    @IsString()
    role?: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);