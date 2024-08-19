import { Donate, Note } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { useQueryTyped } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import { noteRepository } from "@render/modules/note/repository/note.repository";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";
import { formatDateRefToIso } from "@render/utils/date.util";
import { computed, ref, watch } from "vue";

export type DayData = {
  expenses: ClientTransaction[];
  incomes: ClientTransaction[];
  donates: Donate[];
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
  const units = computed(() => storage.value.units);

  const { data } = useQueryTyped<never[]>({
    queryKey: ["transaction", [selectedDate, storage]],
    queryFn: () => fetchDataByDate(),
  });
  const fetchDataByDate = async () => {
    isLoading.value = true;
    try {
      const sharedQueryParams = {
        branchId: storage.value.branchId,
        date: formatDateRefToIso(selectedDate),
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

  watch([selectedDate, () => storage.value.branchId], fetchDataByDate, {
    immediate: true,
  });

  return { dayData, isLoading, selectedDate };
};
