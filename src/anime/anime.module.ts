import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { CommonModule } from 'src/common/common.module';
import { AnimeService } from './anime.service';

@Module({
  imports: [CommonModule],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
