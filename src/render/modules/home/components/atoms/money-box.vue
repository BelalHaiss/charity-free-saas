<script setup lang="ts">
import { TransactionItem } from "@render/modules/transaction/types/transactions.types";
type Props = {
  moneyItems: TransactionItem[];
  label: string;
  onClick?(): void;
};

const { label, moneyItems } = defineProps<Props>();
</script>
<template>
  <div
    class="size-[100px] text-white bg-gray-800 shadow-xl rounded-lg flex-center justify-between p-2 flex-col gap-4"
  >
    <span class="font-bold"> {{ label }}</span>

    <div class="flex flex-col gap-1 max-h-[100px] overflow-auto">
      <span v-for="item in moneyItems" :key="item.unitLabel">
        {{ item.amount.toString() + " " + item.unitLabel }}
      </span>

      <span v-if="moneyItems.length === 0" class="font-bold text-lg"> 0</span>
    </div>
  </div>
</template>
