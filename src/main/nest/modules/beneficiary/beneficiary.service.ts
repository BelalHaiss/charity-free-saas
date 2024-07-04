import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { Injectable } from "@nestjs/common";
import {
  BeneficiaryTableDTO,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { BeneficiaryMapper } from "./beneficiary.mapper";
@Injectable()
export class BeneficiaryService {
  constructor(
    private prismaService: PrismaService,
    private beneficiaryMapper: BeneficiaryMapper,
  ) {}
  create(createBeneficiaryDto: object) {
    return createBeneficiaryDto;
    return "This action adds a new beneficiary";
  }

  async findAll(query: BeneficiaryTableQuery): Promise<BeneficiaryTableDTO[]> {
    const pageQuery = this.prismaService.filterPaginate(query);
    const beneficiaries = await this.prismaService.beneficiary.findMany({
      where: {
        id: query.filter.id,
        people: {
          some: {
            name: {
              contains: query.filter.name,
            },
            identity_card: {
              not: null,
              contains: query.filter.identity_card ?? "",
            },
          },
        },
      },
      ...pageQuery,
      cursor: {
        id: query.cursorPagination?.id,
      },
      orderBy: {
        updated_at: "desc",
      },
      include: {
        people: {
          where: {
            type: "BENEFICIARY",
          },
        },
      },
    });

    return this.beneficiaryMapper.mapToBeneficiaryTableDTO(beneficiaries);
  }

  findOne(id: number) {
    return `This action returns a #${id} beneficiary`;
  }

  update(id: number, updateBeneficiaryDto: object) {
    return updateBeneficiaryDto;
    return `This action updates a #${id} beneficiary`;
  }

  remove(id: number) {
    return `This action removes a #${id} beneficiary`;
  }
}
