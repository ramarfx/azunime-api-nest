import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { StoreAnimeRequest } from 'src/model/anime.model';

@Controller('anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get()
  async getAllAnime() {
    try {
      const result = await this.animeService.getAllAnime();

      return {
        message: 'get all anime success',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async addAnime(@Body() req: StoreAnimeRequest) {
    try {
      const result = await this.animeService.addAnime(req);

      return {
        message: 'add anime success',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getAnimeById(@Param('id') id: number) {
    try {
      const result = await this.animeService.getAnimeById(Number(id))
      
      return {
        message: 'get anime from id success',
        data: result
      }
    } catch (error) {
      return error.message;
    }
  }
}
