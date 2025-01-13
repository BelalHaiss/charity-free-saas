import { fetcher, queryStringify } from "@render/utils/api.util";
import {
  CreateFinancialBenefitPayload,
  CreateNewItem,
  EditFinancialBenefitPayload,
  EditItemPayload,
  FinancialBenefitsQueryResponse,
  FinancialBenefitsTableQuery,
  ItemBenefitsTableQuery,
  ItemQueryResponse,
} from "@shared/types/benefit/benefit.dto";
import { Ref } from "vue";

class BenefitRepository {
  createBenefitItems(newItems: CreateNewItem[]) {
    return fetcher({
      url: `/benefit/items`,
      config: { method: "POST", data: newItems },
    });
  }

  editBenefitItems(editedItems: EditItemPayload[]) {
    return fetcher({
      url: `/benefit/items`,
      config: { method: "PATCH", data: editedItems },
    });
  }

  getBenefitItems(
    filter: Ref<ItemBenefitsTableQuery>,
  ): Promise<ItemQueryResponse> {
    const qs = queryStringify(filter.value);

    return fetcher<ItemQueryResponse>({ url: `/benefit/items/?${qs}` });
  }

  createBenefitFinancial(newItems: CreateFinancialBenefitPayload[]) {
    return fetcher({
      url: `/benefit/financial`,
      config: { method: "POST", data: newItems },
    });
  }

  editBenefitFinancial(editedItems: EditFinancialBenefitPayload[]) {
    return fetcher({
      url: `/benefit/financial`,
      config: { method: "PATCH", data: editedItems },
    });
  }

  getFinancialBenefits(
    filter: Ref<FinancialBenefitsTableQuery>,
  ): Promise<FinancialBenefitsQueryResponse> {
    const qs = queryStringify(filter.value);

    return fetcher<FinancialBenefitsQueryResponse>({
      url: `/benefit/financial/?${qs}`,
    });
  }
}

export const benefitRepository = new BenefitRepository();
