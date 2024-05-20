import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from "../dto/user-index";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }
    
    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async findOneByEmailRegister(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new NotFoundException(`User with email ${email} already exists`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate( id, updateUserDto, { new: true });
        if (!updatedUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return updatedUser;
    }

    async remove(id: string): Promise<void> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}
