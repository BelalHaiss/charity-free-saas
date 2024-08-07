<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { Locale } from "@render/config/i18n";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n<object, Locale>();

const { storage } = useGlobalState();
const unitsOptions = computed((): MoneyUnit[] => storage.value.moneyUnits);

const selectedUnit = defineModel<MoneyUnit>();

const getCodeLabel = (unit: MoneyUnit) =>
  locale.value === "ar" ? unit["ar_code"] : unit["en_code"];

const getLabel = (unit: MoneyUnit) =>
  locale.value === "ar" ? unit["ar_name"] : unit["en_name"];
</script>

<template>
  <Dropdown
    v-model="selectedUnit"
    :options="unitsOptions"
    :optionLabel="getCodeLabel"
    class="flex-1 p-0 border-s-2 rounded-s-none"
  >
    <template #value="slotProps">
      <span v-if="slotProps.value" class="block w-full font-bold">{{
        getCodeLabel(slotProps.value)
      }}</span>
    </template>
    <template #option="slotProps">
      <div class="w-[300px]">
        <div>{{ getLabel(slotProps.option) }}</div>
      </div>
    </template>
  </Dropdown>
</template>
