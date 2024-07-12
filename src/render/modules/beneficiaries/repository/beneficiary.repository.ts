import {
  BeneficiaryTableQuery,
  BeneficiaryTableDTO,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { BeneficiaryRepositoryI } from "./beneficiary-repository.interface";
import { fetcher, queryStringify } from "@render/utils/api.util";
import { Ref } from "vue";

class BeneficiaryRepository implements BeneficiaryRepositoryI {
  async getBeneficiariesTableData(
    filter: Ref<BeneficiaryTableQuery>,
  ): Promise<BeneficiaryTableDTO> {
    const queryString = queryStringify(filter.value);
    const data = await fetcher<BeneficiaryTableDTO>({
      url: `beneficiary/?${queryString}`,
    });
    return data;
  }
}

export const beneficiaryRepository = new BeneficiaryRepository();
