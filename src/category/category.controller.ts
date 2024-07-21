import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    try {
      const result = await this.categoryService.getAllCategory();

      return {
        message: 'get all category success',
        data: result,
      }
    } catch (error) {
      return error;
    }
  }

  @Post()
  async storeCategory(@Body() req: { name: string }) {
    try {
      const result = await this.categoryService.storeCategory(req.name);

       return {
        message: 'create category success',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }
}
