import { useGlobalState } from "@render/composables/use-global-state";
import { useQueryTyped } from "@render/composables/use-query-typed";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { formatDateRefToIso } from "@render/utils/date.util";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { ref, watch } from "vue";

export const useHomeSummary = () => {
  const selectedDate = ref(new Date());
  const { storage } = useGlobalState();

  const expenseTransactionQuery = ref<TransactionQueryByType>({
    branchId: storage.value.branchId!,
    type: "EXPENSE",
    date: formatDateRefToIso(selectedDate),
  });

  watch(selectedDate, () => {
    expenseTransactionQuery.value.date = formatDateRefToIso(selectedDate);
  });
  const { data: expenses = [], isFetching } = useQueryTyped({
    queryKey: ["transaction", expenseTransactionQuery],
    queryFn: () =>
      transactionRepository.findTransactionByDateAndType(
        expenseTransactionQuery,
      ),
  });

  // fetch expenses
  // fetch donates
  // fetch notes
  // return { income - expense -net money - notes }
};
