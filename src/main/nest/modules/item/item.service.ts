import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import type { CreateNewItem } from "@shared/types/item/item.dto";

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}
  create(createItemDto: CreateNewItem) {
    return this.prismaService.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
