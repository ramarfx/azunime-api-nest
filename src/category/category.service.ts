import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAllCategory(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        animes: {
          include: {
            anime: true,
          }
        }
      }
    })

    return categories;
  }

  async storeCategory(category: string): Promise<Category> {
    const categoryReq = await this.prismaService.category.create({
      data: { name: category },
    });

    return categoryReq;
  }
}
