import { fetcher } from "@render/utils/api.util";
import {
  CreateFinancialBenefitPayload,
  CreateNewItem,
  EditFinancialBenefitPayload,
  EditItemPayload,
} from "@shared/types/benefit/benefit.dto";

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
}

export const benefitRepository = new BenefitRepository();
