import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { BeneficiaryTableDTO } from "@shared/types/beneficiaries/beneficiaries.dto";

@Injectable()
export class BeneficiaryMapper {
  mapToBeneficiaryTableDTO(
    data: Prisma.BeneficiaryGetPayload<{
      include: {
        people: true;
      };
    }>[],
  ): BeneficiaryTableDTO[] {
    const mappedData: BeneficiaryTableDTO[] = data.map((item) => ({
      updated_at: item.updated_at,
      created_at: item.created_at,
      id: item.id,
      name: item.people[0].name,
      identity_card: item.people[0].identity_card,
      notes: item.notes,
      sponsorship_case_id: item.people[0].sponsorship_case_id ?? 0,
    }));
    return mappedData;
  }
}
