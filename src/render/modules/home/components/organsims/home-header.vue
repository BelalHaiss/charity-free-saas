<script setup lang="ts">
import MoneyBoxesContainer from "../molecules/money-boxes-container.vue";
import { useI18n } from "vue-i18n";
import DateInput from "@render/components/molecules/date-input.vue";
import { DayData } from "../../view-model/home-summary-view-mode";

const props = defineProps<DayData>();
const selectedDate = defineModel<Date>();

const { t } = useI18n();
</script>
<template>
  <div class="flex flex-col md:flex-row items-center gap-4">
    <MoneyBoxesContainer v-bind="props" />

    <DateInput
      v-model="selectedDate"
      class="min-w-[300px]"
      :label="t('shared.select-date')"
    />
  </div>
</template>
