import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Prisma } from "@prisma/client";
import { ItemChangeQty, ItemQuery } from "@shared/types/item/item.dto";
import { CustomException } from "@main/nest/shared/exception/CustomException";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}
  create(createItemDto: CreateItemDto) {
    return "This action adds a new item";
  }

  async getItemByName(query: CastQueryFieldsToStrings<ItemQuery>) {
    return this.prismaService.item.findMany({
      where: {
        name: {
          contains: query.name,
        },
      },
    });
  }

  async updateMultipleItemsQty(
    items: ItemChangeQty[],
    prismaTx: Prisma.TransactionClient, // Pass the transaction client here
  ): Promise<void> {
    for (const { itemId, change } of items) {
      const item = await prismaTx.item.findUnique({
        where: { id: itemId },
        select: { qty: true },
      });

      const newQty = item!.qty + change;

      if (newQty < 0) {
        throw new CustomException({
          message: "item qty can be less than 0",
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await prismaTx.item.update({
        where: { id: itemId },
        data: { qty: newQty },
      });
    }
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
