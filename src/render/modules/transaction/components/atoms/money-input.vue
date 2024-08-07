<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";

const moneyUnit = defineModel<MoneyUnit>("unit");
const value = defineModel<number>("value");
</script>

<template>
  <div class="border rounded-xl flex">
    <InputNumber
      v-model="value"
      inputId="withoutgrouping"
      :useGrouping="false"
    />
  </div>
</template>
