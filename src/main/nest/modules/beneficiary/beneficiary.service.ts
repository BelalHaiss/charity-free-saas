import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { Injectable } from "@nestjs/common";
import {
  BeneficiaryTableDTO,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { BeneficiaryMapper } from "./beneficiary.mapper";
import { Prisma } from "@prisma/client";
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

  async findAll(query: BeneficiaryTableQuery): Promise<BeneficiaryTableDTO> {
    const pageQuery = this.prismaService.filterPaginate(query);
    const currentQuery: Prisma.BeneficiaryFindManyArgs = {
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
    };

    const [beneficiaries, totalRecords] = await this.prismaService.$transaction(
      [
        this.prismaService.beneficiary.findMany({
          ...currentQuery,
          ...pageQuery,

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
        }),
        this.prismaService.beneficiary.count({
          where: currentQuery.where,
        }),
      ],
    );
    const data = this.beneficiaryMapper.mapToBeneficiaryTableDTO(beneficiaries);

    return { data, totalRecords };
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
