import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AnimeModule } from './anime/anime.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, CommonModule, AnimeModule, CategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
