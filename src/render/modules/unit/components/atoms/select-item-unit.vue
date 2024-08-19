<script setup lang="ts">
import SelectInput from "@render/components/molecules/select-input.vue";
import { useGlobalState } from "@render/composables/use-global-state";
import { SelectOptions } from "@render/types/form.types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { storage } = useGlobalState();
const unitsOptions = computed((): SelectOptions<number>[] =>
  storage.value.units.map((unit) => ({ label: unit.label, value: unit.id })),
);

const selectedUnit = defineModel<SelectOptions<number>>();
</script>
<template>
  <SelectInput
    v-model="selectedUnit"
    :isLoading="false"
    :options="unitsOptions"
    :placeholder="t('shared.select', { label: t('shared.unit') })"
    :label="t('shared.select', { label: t('shared.unit') })"
  />
</template>
