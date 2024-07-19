import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async storeCategory(category: string): Promise<Category> {
    const categoryReq = await this.prismaService.category.create({
      data: { name: category },
    });

    return categoryReq;
  }
}
