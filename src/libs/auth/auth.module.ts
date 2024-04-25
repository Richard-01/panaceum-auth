import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/auth.controller.module';
import { ServicesService } from './services/auth.service.service';

@Module({
  imports: [ControllersModule],
  providers: [ServicesService]
})
export class AuthModule {}
