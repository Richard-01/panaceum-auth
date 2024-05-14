import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto } from "../dto/user-index";
import { UserService } from "../services/user.service";


@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class userController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() CreateUserDto: CreateUserDto){
        return this.userService.create(CreateUserDto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto){
        return this.userService.update(id, UpdateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userService.remove(id);
    }
}
