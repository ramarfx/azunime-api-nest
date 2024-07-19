import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async storeCategory(@Body() req: { name: string }) {
    try {
      const result = await this.categoryService.storeCategory(req.name);

      return result;
    } catch (error) {
      return error;
    }
  }
}
