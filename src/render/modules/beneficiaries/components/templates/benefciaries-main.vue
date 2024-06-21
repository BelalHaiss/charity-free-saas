<script setup lang="ts">
import TableFilterControl from '@render/components/molecules/table-filters/table-filter-control.vue';
import { useGlobalState } from '@render/composables/use-global-state';
import { Locale } from '@render/config/i18n';
import { TableColumns, TableFilter } from '@render/types/table.types';
import { formatDate } from '@render/utils/date.util';
import { BeneficiaryTableDTO } from '@shared/types/beneficiaries/beneficiaries.dto';
import Column, { ColumnProps } from 'primevue/column';
import InputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router/auto';
// @ts-ignore
const { t, locale } = useI18n<any, Locale>();
const { getters } = useGlobalState();
const headers = computed<TableColumns<BeneficiaryTableDTO>[]>(() => [
  {
    field: 'id',
    dataGetter: (data) => data.id,
    header: t('shared.code'),
    fieldType: 'number'
  },
  {
    field: 'name',
    dataGetter: (data) => data.name,
    header: t('shared.name', { label: t('shared.beneficiary') })
  },
  {
    dataGetter: (data) => data.identity_card!,
    field: 'identity_card',
    header: t('identity_card'),
    fieldType: 'text'
  },
  {
    dataGetter: (data) => data.sponsorship_case_id!.toString(),
    field: 'sponsorship_case_id',
    header: t('shared.type', { label: t('shared.sponsorship') }),
    fieldType: 'select'
  },
  {
    field: 'created_at',
    dataGetter: (data) =>
      formatDate(data.created_at, locale.value, 'd / L / y'),

    header: t('shared.created_at'),
    fieldType: 'date'
  },
  {
    dataGetter: (data) =>
      formatDate(data.updated_at, locale.value, 'd / L / y'),
    header: t('shared.updated_at'),
    field: 'updated_at',
    fieldType: 'date'
  },
  {
    dataGetter: (data) => 'as',
    field: 'notes',
    header: t('shared.note')
  }
]);
const filters = ref<TableFilter<BeneficiaryTableDTO>>({
  id: { value: null, matchMode: 'contains' },
  identity_card: { value: null, matchMode: 'contains' },
  name: { value: null, matchMode: 'contains' }
});

const dummyData: BeneficiaryTableDTO[] = [
  {
    created_at: new Date(2024, 4, 23),
    updated_at: new Date(),
    name: 'ahmed',
    sponsorship_case_id: 213,
    id: 12321,
    identity_card: '123123333333',
    notes: null
  },
  {
    created_at: new Date(2024, 2, 23),
    updated_at: new Date(),
    name: '3abdo',
    sponsorship_case_id: 213,
    id: 12321,
    identity_card: '123123333333',
    notes: null
  },
  {
    created_at: new Date(2024, 5, 23),
    updated_at: new Date(),
    name: 'karim',
    sponsorship_case_id: 213,
    id: 12321,
    identity_card: '123123333333',
    notes: null
  }
];
</script>
<template>
  <div class="flex flex-col page-content p-2">
    <DataTable
      :rows="dummyData.length"
      :value="dummyData"
      :filters="filters"
      showGridlines
      filterDisplay="row"
      paginator
      @update:filters="(newFilters) => (filters = newFilters)"
      @filter="(e) => (filters = e.filters)"
    >
      <Column
        v-for="column in headers"
        :key="column.header"
        :field="column.field"
        :showFilterMatchModes="false"
        :show-filter-menu="false"
        :header="column.header"
      >
        <template #body="{ data }"> {{ column.dataGetter(data) }}</template>
        <template
          v-if="filters[column.field]"
          class="max-w-[100px]"
          #filter="{ filterCallback, field, filterModel }"
        >
          <TableFilterControl
            v-model="filterModel.value"
            :name="column.field"
            @keydown.enter="filterCallback()"
            :type="column.fieldType ?? 'text'"
          />
        </template>
      </Column>

      <template #header>
        <RouterLink to="/beneficiaries/create">
          <Button>
            {{ $t('shared.add', { label: $t('shared.beneficiary') }) }}
          </Button>
        </RouterLink></template
      >
    </DataTable>
  </div>
</template>
