import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
