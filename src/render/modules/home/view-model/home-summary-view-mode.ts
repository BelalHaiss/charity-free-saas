import { Donate, Note, Transaction } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { useQueryTyped } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import { noteRepository } from "@render/modules/note/repository/note.repository";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { formatDateRefToIso } from "@render/utils/date.util";
import { QueryDonateByDate } from "@shared/types/donates/donates.dto";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { ref, watch } from "vue";

type DayDate = {
  expenses: Transaction[];
  incomes: Transaction[];
  donates: Donate[];
  notes: Note[];
};
export const useHomeSummary = () => {
  const selectedDate = ref(new Date());
  const { storage } = useGlobalState();

  const isFetching = ref(true);
  const { failedToast } = useToast();
  const dayData = ref<DayDate>({
    donates: [],
    expenses: [],
    incomes: [],
    notes: [],
  });

  const moneyTotals = ref({ incomes: 0, expenses: 0, net: 0 });
  const fetchDataByDate = async () => {
    isFetching.value = true;
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

      // const totalExpenses = expenses.reduce(())
    } catch (e) {
      console.error(e);
      failedToast();
    } finally {
      isFetching.value = false;
    }
  };

  watch(selectedDate, fetchDataByDate, { immediate: true });
};
