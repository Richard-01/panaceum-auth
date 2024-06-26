import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
  Headers
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto, UserLoginDto } from '../dtos/common/user-index';
import { AtGuard } from '../guards/at.guard';
import { IsPublic } from '../../decorators/public.decorator';
import { AuthService } from '../services/auth.service.service';

@IsPublic()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* 
  This method handles POST /auth/register requests. It's decorated with @Public(), meaning it can be accessed without authentication. It takes a SignUpDto object from the request body, passes it to AuthService.register(), and returns the resulting access token.
  */
  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signUpDto: SignUpDto) {
    const token = await this.authService.register(signUpDto);
    return { access_token: token.access_token };
  }

  /* 
  This method handles POST /auth/login requests. Like register, it's also public. It takes a UserLoginDto object from the request body, passes it to AuthService.logIn(), and returns the resulting access token.
  */
  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userLogInDto: UserLoginDto) {
    const token = await this.authService.logIn(userLogInDto);

    return { access_token: token.access_token };
  }

  /* 
  This method handles POST /auth/check requests. It's decorated with @UseGuards(AtGuard), meaning it requires authentication. It doesn't take any input and simply returns true. This could be used to check if the client's access token is valid.
  */
  @ApiOperation({ summary: 'Verificar token' })
  @Get('check')
  @UseGuards(AtGuard)
  async check(@Headers('Authorization') authHeader: string) {
    try {
      const token = authHeader.replace('Bearer ', '');
      return await this.authService.check(token);
    } catch (error) {
      console.error('Error in token verification:', error);
      throw new InternalServerErrorException('Failed to verify token');
    }
  }
}
