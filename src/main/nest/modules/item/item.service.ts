import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Prisma } from "@prisma/client";
import { CustomException } from "@main/nest/shared/exception/CustomException";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import {
  CreateNewItem,
  EditItemPayload,
  ItemBenefitsTableQuery,
  ItemChangeQty,
  ItemQuery,
  ItemQueryResponse,
} from "@shared/types/benefit/benefit.dto";
import { optionalCast } from "@shared/services/object.util";

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  createItems(newItems: CreateNewItem[]) {
    return this.prismaService.$transaction(async (tx) => {
      const bulkCreate = newItems.map((item) =>
        tx.benefit.create({
          data: {
            type: "ITEM",
            Item: {
              create: item,
            },
          },
        }),
      );
      await Promise.all(bulkCreate);
    });
  }

  editItems(editedItems: EditItemPayload[]) {
    return this.prismaService.$transaction(async (tx) => {
      const bulkEdit = editedItems.map((item) =>
        tx.item.update({
          where: {
            id: item.id,
          },
          data: item,
        }),
      );
      await Promise.all(bulkEdit);
    });
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
          message: "item qty can`t be less than 0",
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await prismaTx.item.update({
        where: { id: itemId },
        data: { qty: newQty },
      });
    }
  }

  async findAll(
    query: CastQueryFieldsToStrings<ItemBenefitsTableQuery>,
  ): Promise<ItemQueryResponse> {
    const queryFilter: Prisma.ItemFindManyArgs = {
      where: {
        category_id: optionalCast(query.filter.category_id, "toNumber"),
        name: optionalCast(query.filter.name, "toString"),
      },
    };
    const [data, totalRecords] = await this.prismaService.$transaction([
      this.prismaService.item.findMany({
        ...queryFilter,
        include: { category: true, benefit: true, unit: true },
        ...this.prismaService.handlePagination(query.pagination),
        orderBy: this.prismaService.handleSorting(query.sort),
      }),
      this.prismaService.item.count({
        where: queryFilter.where,
      }),
    ]);
    return { data, totalRecords };
  }
}
