import { HttpStatus, Injectable } from "@nestjs/common";
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
import { Prisma } from "@prisma/client";
import { UnitService } from "../unit/unit.service";
import { ItemService } from "../item/item.service";
import { ItemChangeQty } from "@shared/types/item/item.dto";
import { CustomException } from "@main/nest/shared/exception/CustomException";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class DonateService {
  constructor(
    private prismaService: PrismaService,
    private unitService: UnitService,
    private itemService: ItemService,
    private utilService: UtilsService,
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
    const convertedItemsPromises = items.map(
      async (item): Promise<Prisma.DonateItemCreateManyDonateInput> => ({
        item_id: item.item_id!,
        unit_value: await this.unitService.convertToSmUnit(
          item.unitId!,
          item.unitSize!,
          item.unit_value!,
        )!,
        user_unit_size: item.unitSize!,
        user_unit_value: item.unit_value!,
      }),
    );
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
    timeZone: string,
  ): Promise<DonateWithRelations[]> {
    return this.prismaService.donate.findMany({
      where: {
        branch_id: +query.branchId,
        created_at: this.utilService.getFullDayDateFilter(query.date, timeZone),
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
    return this.prismaService.$transaction(async (tx) => {
      const donate = await tx.donate.findUnique({
        where: { id },
        include: { donate_items: true, transaction: true }, // Include associated donate_items
      });

      if (!donate) {
        throw new CustomException({
          message: "Donation not found",
          status: HttpStatus.NOT_FOUND,
        });
      }

      await tx.donate.delete({ where: { id } });

      if (donate.donate_items.length > 0) {
        await this.itemService.updateMultipleItemsQty(
          donate.donate_items.map((donateItem) => ({
            change: -donateItem.unit_value,
            itemId: donateItem.id,
          })),
          tx,
        );
      }
    });
  }
}
