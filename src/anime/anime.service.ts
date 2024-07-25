import { HttpException, Injectable } from '@nestjs/common';
import { Anime } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { StoreAnimeRequest } from 'src/model/anime.model';

@Injectable()
export class AnimeService {
  constructor(private prismaService: PrismaService) {}

  async getAllAnime(): Promise<Anime[]> {
    const anime = await this.prismaService.anime.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (anime.length === 0) {
      throw new HttpException('anime is empty', 404);
    }

    const simplifiedAnimes = anime.map((anime) => ({
      id: anime.id,
      title: anime.title,
      episode: anime.episode,
      categories: anime.categories.map((cat) => cat.category.name),
    }));

    return simplifiedAnimes;
  }

  async addAnime(request: StoreAnimeRequest): Promise<Anime> {
    const anime = await this.prismaService.anime.create({
      data: {
        title: request.title,
        episode: request.episode,
        categories: {
          create: request.categories.map((id) => ({
            categoryId: id,
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    const simplifiedAnimes = {
      id: anime.id,
      title: anime.title,
      episode: anime.episode,
      categories: anime.categories.map((cat) => cat.category.name),
    };

    return simplifiedAnimes;
  }

  async getAnimeById(id: number): Promise<Anime> {
    const anime = await this.prismaService.anime.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    const simplifiedAnimes = {
      id: anime.id,
      title: anime.title,
      episode: anime.episode,
      categories: anime.categories.map((cat) => cat.category.name),
    };

    return simplifiedAnimes;
  }

  async deleteAnime(id: number): Promise<null> {
    const anime = await this.prismaService.anime.delete({
      where: {
        id: id,
      },
    });

    if (!anime) {
      throw new HttpException('anime not found', 404);
    }

    return null;
  }
}
