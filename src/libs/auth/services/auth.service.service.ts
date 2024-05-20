import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';
import { SignUpDto, UserLoginDto } from '../dtos/common/user-index';
import { HashService } from '../../utils/services/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async logIn(userLogInDto: UserLoginDto) {
    const user = await this.userService.findOneByEmail(userLogInDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.hashService.compare(
      userLogInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    // Obtener el token y el payload
    const { access_token, payload } = await this.getTokens({
      sub: user.id,
      fullName: user.fullName,
    });

    return { access_token, payload };
  }

  async register(userRegister: SignUpDto): Promise<Tokens> {
    await this.validateEmailForSignUp(userRegister.email);

    const hashedPassword = await this.hashService.hash(userRegister.password);

    const user = await this.userService.create({
      email: userRegister.email,
      fullName: userRegister.fullName,
      password: hashedPassword,
      role: userRegister.role,
      typeId: userRegister.typeId,
      Id: userRegister.Id,
      dateOfBirth: userRegister.dateOfBirth,
    });

    // Obtener el token y el payload
    const { access_token, payload } = await this.getTokens({
      sub: user.id,
      fullName: user.fullName,
    });

    return { access_token, payload };
  }

  async check(token: string): Promise<any> {
    try {
      // Verificar el token
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Obtener el token y el payload
      const { access_token, payload: userPayload } = await this.getTokens({
        id: user.id,
        typeId: user.typeId,
        email: user.email,
        fullName: user.fullName,
        password: user.password, // Considera no devolver la contraseña en producción
        role: user.role,
        dateOfBirth: user.dateOfBirth,
      });

      // Incluir los datos adicionales en la respuesta
      return {
        valid: true,
        access_token,
        payload: userPayload
      };
    } catch (error) {
      console.error('Error verifying token:', error.message || error);
      throw new UnauthorizedException('Invalid token');
    }
  }

async getTokens(user: any): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const payload = {
        id: user.id,
        typeId: user.typeId,
        email: user.email,
        fullName: user.fullName,
        password: user.password, // Considera no devolver la contraseña en producción
        role: user.role,
        dateOfBirth: user.dateOfBirth,
    };

    const accessToken = await this.signToken(
        payload,
        secretKey,
        accessTokenOptions,
    );

    return { access_token: accessToken, payload };
}


  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async validateEmailForSignUp(email: string): Promise<boolean | undefined> {
    const user = await this.userService.findOneByEmailRegister(email);

    if (user) {
      throw new HttpException('Email already exists!', 400);
    }
    return true;
  }
}
