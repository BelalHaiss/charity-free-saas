import { Note } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import { noteRepository } from "@render/modules/note/repository/note.repository";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";
import { formatDateRefToIsoDateOnly } from "@render/utils/date.util";
import { DonateWithRelations } from "@shared/types/donates/donates.dto";
import { useQuery } from "@tanstack/vue-query";
import { computed, provide, ref, watch } from "vue";

export type DayData = {
  expenses: ClientTransaction[];
  incomes: ClientTransaction[];
  donates: DonateWithRelations[];
  notes: Note[];
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
    notes: [],
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

      // fetch day notes
      const dayNotes = await noteRepository.getDayNotes(sharedQueryParams);
      dayData.value = {
        donates,
        notes: dayNotes,
        expenses,
        incomes,
      };
      return [];
    } catch (e) {
      console.error(e);
      failedToast();
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  watch([selectedDate, () => storage.value.branchId], () => refetch());

  return { dayData, isLoading, selectedDate };
};
