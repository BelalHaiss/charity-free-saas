<script setup lang="ts">
import SelectInput from '@render/components/molecules/select-input.vue';
import { SelectOptions } from '@render/types/form.types';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { unitRepository } from '../../repository/unit.repository';
import { QUERY_KEYS } from '@render/composables/use-query-typed';

const { t } = useI18n();

const { data: units, isLoading } = useQuery({
  queryKey: QUERY_KEYS.UNITS,
  queryFn: () => unitRepository.getAllUnits(),
  initialData: []
});

const unitsOptions = computed<SelectOptions<number>[]>(
  () =>
    units.value?.map((item) => ({ label: item.label, value: item.id })) ?? []
);

const selectedUnit = defineModel<number>();
</script>
<template>
  <Dropdown
    v-model="selectedUnit"
    :loading="isLoading"
    input-id="select"
    :options="unitsOptions"
    filter
    option-value="value"
    option-label="label"
    :placeholder="
      t('select', {
        label: t('pages.settings_unit')
      })
    "
    class="max-w-[300px] form-input"
  >
  </Dropdown>
</template>
