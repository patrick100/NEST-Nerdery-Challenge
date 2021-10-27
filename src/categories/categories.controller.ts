import { Category } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { ModifyCategoryDto } from './dto/request/modify-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Get()
  categories(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Category[]> {
    return this.categoryService.categories(paginationQuery);
  }

  // TODO VerifyManager
  @Post()
  createCategory(@Body() categoryData: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryData);
  }

  // TODO VerifyManager
  @Patch(':categoryId')
  modifyCategory(
    @Param('categoryId') categoryId: string,
    @Body() categoryData: ModifyCategoryDto,
  ): Promise<Category> {
    return this.categoryService.modifyCategory(
      { uuid: categoryId },
      categoryData,
    );
  }

  // TODO VerifyManager
  @Delete(':categoryId')
  deleteMeUser(@Param('categoryId') categoryId: string): Promise<Category> {
    return this.categoryService.deleteCategory({ uuid: categoryId });
  }
}