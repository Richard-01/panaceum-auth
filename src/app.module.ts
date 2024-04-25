import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/app.module';


@Module({
  imports: [ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
