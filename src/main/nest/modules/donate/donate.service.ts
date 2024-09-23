import { Injectable } from "@nestjs/common";
import { CreateDonateDto } from "./dto/create-donate.dto";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import type {
  DonateWithRelations,
  NewDonate,
  PartialDonateItem,
  QueryDonateByDate,
} from "@shared/types/donates/donates.dto";
import type {
  CastDateFieldsToIsoDate,
  CastQueryFieldsToStrings,
} from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { endOfTheDay, startOfTheDay } from "@main/nest/shared/utils/date.util";
import { Prisma } from "@prisma/client";
import { UnitService } from "../unit/unit.service";
import { ItemService } from "../item/item.service";
import { ItemChangeQty } from "@shared/types/item/item.dto";

@Injectable()
export class DonateService {
  constructor(
    private prismaService: PrismaService,
    private unitService: UnitService,
    private itemService: ItemService,
  ) {}
  async create(newDonate: CastDateFieldsToIsoDate<NewDonate>) {
    let donateItems: Prisma.DonateItemCreateManyDonateInput[] = [];
    let itemsQtyChanges: ItemChangeQty[] = [];
    if (newDonate.items) {
      const mappedItems = await this.mapDonateItems(newDonate.items);
      donateItems = mappedItems.donateItems;
      itemsQtyChanges = mappedItems.itemChangeQty;
    }

    const donateData: Prisma.DonateCreateArgs["data"] = {
      branch_id: newDonate.branch_id,
      created_at: newDonate.date,
      created_by: newDonate.created_by,
      donor_phone: newDonate.donor_phone,
      donor: newDonate.donor,
    };
    if (newDonate.financialTransaction) {
      donateData.transaction = {
        create: {
          amount: newDonate.financialTransaction.amount as number,
          unit_id: newDonate.financialTransaction.unit_id,
          created_by: newDonate.created_by,
          branch_id: newDonate.branch_id,
          created_at: newDonate.date,
          type: "DONATE",
        },
      };
    }
    if (newDonate.items) {
      donateData.donate_items = {
        createMany: { data: donateItems },
      };
    }

    return this.prismaService.$transaction(async (tx) => {
      await tx.donate.create({ data: donateData });

      if (newDonate.items && newDonate.items.length) {
        await this.itemService.updateMultipleItemsQty(itemsQtyChanges, tx);
      }
    });
  }

  private async mapDonateItems(items: PartialDonateItem[]): Promise<{
    donateItems: Prisma.DonateItemCreateManyDonateInput[];
    itemChangeQty: ItemChangeQty[];
  }> {
    const convertedItemsPromises = items.map(async (item) => ({
      item_id: item.item_id!,
      unit_value: await this.unitService.convertToSmUnit(
        item.unitId!,
        item.unitSize!,
        item.unit_value!,
      )!,
    }));
    const donateItems = await Promise.all(convertedItemsPromises);

    const itemChangeQty = donateItems.map(
      (item): ItemChangeQty => ({
        itemId: item.item_id,
        change: item.unit_value,
      }),
    );
    return { donateItems, itemChangeQty };
  }

  findByDate(
    query: CastQueryFieldsToStrings<QueryDonateByDate>,
  ): Promise<DonateWithRelations[]> {
    return this.prismaService.donate.findMany({
      where: {
        branch_id: +query.branchId,
        created_at: {
          gte: startOfTheDay(query.date),
          lte: endOfTheDay(query.date),
        },
      },
      include: {
        transaction: true,
        donate_items: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} donate`;
  }

  update(id: number, updateDonateDto: UpdateDonateDto) {
    return `This action updates a #${id} donate`;
  }

  remove(id: number) {
    return `This action removes a #${id} donate`;
  }
}
