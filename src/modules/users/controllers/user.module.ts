import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto } from "../dto/user-index";
import { UserService } from "../services/user.service";


@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class userController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Post()
    create(@Body() CreateUserDto: CreateUserDto){
        return this.userService.create(CreateUserDto);
    }

    @ApiOperation({ summary: 'Get all Users' })
    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Get User by id' })
    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.userService.findOne(id);
    }

    @ApiOperation({ summary: 'Update User by id' })
    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Put(':id')
    update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto){
        return this.userService.update(id, UpdateUserDto);
    }


    @ApiOperation({ summary: 'Delete User by id' })
    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userService.remove(id);
    }
}
