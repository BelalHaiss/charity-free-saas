<script setup lang="ts">
import AddBtnIcon from "@render/components/atoms/add-btn-icon.vue";
import { TransactionItem } from "@render/modules/transaction/types/transactions.types";
type Props = {
  moneyItems: TransactionItem[];
  label: string;
  onClick?(): void;
};

const { label, moneyItems, onClick } = defineProps<Props>();
</script>
<template>
  <div
    class="size-[120px] relative text-white bg-gray-800 shadow-xl rounded-lg flex-center justify-between p-2 flex-col gap-1"
  >
    <span class="font-bold"> {{ label }}</span>

    <div
      class="flex flex-col font-medium flex-1 gap-1 overflow-auto w-full flex-center no-scrollbar"
    >
      <span v-for="item in moneyItems" :key="item.unitLabel">
        {{ item.amount.toString() + " " + item.unitLabel }}
      </span>

      <span v-if="moneyItems.length === 0"> 0</span>
    </div>

    <AddBtnIcon
      v-if="!!onClick"
      :btn-props="{
        text: true,
        raised: true,
        rounded: true,
        class: 'bg-white text-sm p-1 ',
      }"
      @click="onClick"
    />
  </div>
</template>
