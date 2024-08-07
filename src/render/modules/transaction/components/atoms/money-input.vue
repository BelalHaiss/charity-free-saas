<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";
import MoneyUnitSelect from "@render/modules/unit/components/atoms/money-unit-select.vue";

const moneyUnit = defineModel<MoneyUnit>("unit");
const value = defineModel<number>("value");
</script>

<template>
  <div class="flex w-[300px]">
    <InputNumber
      v-model="value"
      inputId="withoutgrouping"
      inputClass="border-e-0 rounded-e-none  "
      :useGrouping="false"
    />
    <MoneyUnitSelect v-model="moneyUnit" />
  </div>
</template>
