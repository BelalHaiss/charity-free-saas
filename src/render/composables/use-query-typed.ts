import { BeneficiaryTableQuery } from "@shared/types/beneficiaries/beneficiaries.dto";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Ref } from "vue";

export const QUERY_KEYS = {
  UNITS: ["unit"],
  MONEY_UNITS: ["money_units"],
  BENEFICIARY_TABLE: (tableQuery: Ref<BeneficiaryTableQuery>) => [
    "beneficiary",
    tableQuery,
  ],
  CATEGORY: (branchId: Ref<number>) => ["category", branchId],
  TRANSACTION: (selectedDate: Ref<Date, Date>) => ["transaction", selectedDate],
  ITEM_ID: (itemId: number) => ["item", itemId],
  EXPENSES_NAME: (branchId: Ref<number>) => [
    "transaction",
    "expenses_name",
    branchId,
  ],
  SETUP_STATUS: ["setup", "status"],
};

export const useQueryHelper = <T>() => {
  const queryClient = useQueryClient();

  const invalidateQueries = (key: QueryKey) =>
    queryClient.invalidateQueries({ queryKey: key });

  return { invalidateQueries, useQuery };
};
