import {
  BeneficiaryTableDTO,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";

export interface BeneficiaryRepositoryI {
  getBeneficiariesTableData(
    filter: BeneficiaryTableQuery,
  ): Promise<BeneficiaryTableDTO[]>;
}
