import { Injectable } from "@nestjs/common";
import { CreateDonateDto } from "./dto/create-donate.dto";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import type { QueryDonateByDate } from "@shared/types/donates/donates.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { endOfTheDay, startOfTheDay } from "@main/nest/shared/utils/date.util";

@Injectable()
export class DonateService {
  constructor(private prismaService: PrismaService) {}
  create(createDonateDto: CreateDonateDto) {
    return "This action adds a new donate";
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
