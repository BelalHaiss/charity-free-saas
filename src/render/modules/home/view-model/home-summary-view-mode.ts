import { useGlobalState } from "@render/composables/use-global-state";
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";
import { formatDateRefToIsoDateOnly } from "@render/utils/date.util";
import { ClientDonateWithRelations } from "@shared/types/donates/donates.dto";
import { useQuery } from "@tanstack/vue-query";
import { provide, ref, watch } from "vue";

export type DayData = {
  expenses: ClientTransaction[];
  incomes: ClientTransaction[];
  donates: ClientDonateWithRelations[];
};
export const useHomeSummary = () => {
  const selectedDate = ref(new Date());
  const { storage } = useGlobalState();

  const isLoading = ref(true);
  const { failedToast } = useToast();
  const dayData = ref<DayData>({
    donates: [],
    expenses: [],
    incomes: [],
  });

  provide("dayData", dayData);
  provide("currentSelectedDate", selectedDate);
  const { refetch } = useQuery({
    queryKey: QUERY_KEYS.TRANSACTION(selectedDate),
    queryFn: () => fetchDataByDate(),
  });

  const fetchDataByDate = async () => {
    isLoading.value = true;
    try {
      const sharedQueryParams = {
        branchId: storage.value.branchId,
        date: formatDateRefToIsoDateOnly(selectedDate),
      };
      const expenses = await transactionRepository.findTransactionByDateAndType(
        { ...sharedQueryParams, type: "EXPENSE" },
      );
      const incomes = await transactionRepository.findTransactionByDateAndType({
        ...sharedQueryParams,
        type: "DONATE",
      });
      const donates =
        await donateRepository.getDonatesByDate(sharedQueryParams);

      dayData.value = {
        donates,
        expenses,
        incomes,
      };
      return [];
    } catch (e) {
      console.error(e);
      failedToast(e);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  watch([selectedDate, () => storage.value.branchId], () => refetch());

  return { dayData, isLoading, selectedDate };
};
