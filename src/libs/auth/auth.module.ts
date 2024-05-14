import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../modules/users/user.module';
import { JwtStrategy } from './strategies/at.strategy';
import { AuthService } from './services/auth.service.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ],
})
export class AuthModule {}
