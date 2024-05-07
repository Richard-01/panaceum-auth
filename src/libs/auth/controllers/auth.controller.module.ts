import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto, UserLogInDto } from '../dtos/common/user-index';
import { IsPublic } from '../../decorators/public,decorator';
import { AuthService } from '../services/auth.service.service';

@IsPublic()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signUpDto: UserSignUpDto) {
    const token = await this.authService.register(signUpDto);
    return { access_token: token.access_token };
  }

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userLogInDto: UserLogInDto) {
    const token = await this.authService.logIn(userLogInDto);

    return { access_token: token.access_token };
  }

  @Post('check')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  }
}
