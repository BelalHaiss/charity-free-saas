import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Prisma } from "@prisma/client";
import { ItemChangeQty } from "@shared/types/item/item.dto";
import { CustomException } from "@main/nest/shared/exception/CustomException";

@Injectable()
export class ItemService {
  create(createItemDto: CreateItemDto) {
    return "This action adds a new item";
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
