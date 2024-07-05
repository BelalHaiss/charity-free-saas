import {
  BeneficiaryTableQuery,
  BeneficiaryTableDTO,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { BeneficiaryRepositoryI } from "./beneficiary-repository.interface";
import { fetcher, queryStringify } from "@render/utils/api.util";

class BeneficiaryRepository implements BeneficiaryRepositoryI {
  async getBeneficiariesTableData(
    filter: BeneficiaryTableQuery,
  ): Promise<BeneficiaryTableDTO[]> {
    console.log({ filter }, "beneficary table filter");
    const queryString = queryStringify(filter);
    const data = await fetcher<BeneficiaryTableDTO[]>({
      url: `beneficiary/?${queryString}`,
    });
    return data;
  }
}

export const beneficiaryRepository = new BeneficiaryRepository();
