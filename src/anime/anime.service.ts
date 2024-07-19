import { HttpException, Injectable } from '@nestjs/common';
import { Anime } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { StoreAnimeRequest } from 'src/model/anime.model';

@Injectable()
export class AnimeService {
  constructor(private prismaService: PrismaService) {}

  async getAllAnime(): Promise<Anime[]> {
    const anime = await this.prismaService.anime.findMany();

    if (anime.length === 0) {
      throw new HttpException('anime is empty', 404);
    }

    return anime;
  }

  async addAnime(request: StoreAnimeRequest): Promise<Anime> {
    const anime = await this.prismaService.anime.create({
      data: {
        title: request.title,
        episode: request.episode,
      },
    });

    request.categories.forEach(async (category) => {
      await this.prismaService.categoriesOnAnimes.create({
        data: {
          animeId: anime.id,
          categoryId: category,
        },
      });
    });

    return anime;
  }
}
