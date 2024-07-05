import {
  BeneficiaryTableDTO,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { Ref } from "vue";

export interface BeneficiaryRepositoryI {
  getBeneficiariesTableData(
    filter: Ref<BeneficiaryTableQuery>,
  ): Promise<BeneficiaryTableDTO>;
}
