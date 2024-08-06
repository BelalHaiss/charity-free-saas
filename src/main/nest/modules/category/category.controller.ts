import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Prisma } from "@prisma/client";
import type { NewCategory } from "@shared/types/category/category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() newCategory: NewCategory) {
    try {
      console.log({ newCategory });
      return await this.categoryService.create(newCategory);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Get(":branch_id")
  findAll(@Param("branch_id") branch_id: string) {
    return this.categoryService.findAll(+branch_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
