import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { NewCategory } from "@shared/types/category/category.dto";

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  create(newCategory: NewCategory) {
    return this.prismaService.category.create({ data: newCategory });
  }

  findAll(branch_id: number) {
    return this.prismaService.category.findMany({
      where: {
        branch_id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
