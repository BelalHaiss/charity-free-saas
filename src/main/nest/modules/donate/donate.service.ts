import { Injectable } from "@nestjs/common";
import { CreateDonateDto } from "./dto/create-donate.dto";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import type {
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

@Injectable()
export class DonateService {
  constructor(
    private prismaService: PrismaService,
    private unitService: UnitService,
  ) {}
  async create(newDonate: CastDateFieldsToIsoDate<NewDonate>) {
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
        createMany: { data: await this.mapDonateItems(newDonate.items) },
      };
    }
    return this.prismaService.donate.create({ data: donateData });
  }

  private async mapDonateItems(
    items: PartialDonateItem[],
  ): Promise<Prisma.DonateItemCreateManyDonateInput[]> {
    const convertedItemsPromises = items.map(async (item) => ({
      item_id: item.unitId!,
      unit_value: await this.unitService.convertToSmUnit(
        item.unitId!,
        item.unitSize!,
        item.unit_value!,
      )!,
    }));
    return Promise.all(convertedItemsPromises);
  }
  findByDate(query: CastQueryFieldsToStrings<QueryDonateByDate>) {
    return this.prismaService.donate.findMany({
      where: {
        branch_id: +query.branchId,
        created_at: {
          gte: startOfTheDay(query.date),
          lte: endOfTheDay(query.date),
        },
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
