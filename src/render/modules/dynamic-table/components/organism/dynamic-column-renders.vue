<script setup lang="ts" generic="T extends object">
import TableFilterControl from "@render/components/molecules/table-filters/table-filter-control.vue";
import { TableColumns } from "@render/types/table.types";

const props = defineProps<{
  headers: TableColumns<T>[];
  filters?: Record<string, string | number>;
}>();
</script>

<template>
  <Column
    v-for="column in props.headers"
    :key="column.header"
    :field="column.field as string"
    :show-filter-match-modes="false"
    :show-filter-menu="false"
    :header="column.header"
  >
    <template v-if="column.headerComponent" #header>
      <component
        :is="column.headerComponent.component"
        v-bind="column.headerComponent.props"
      />
    </template>

    <template
      v-if="filters && filters[column.field as string]"
      #filter="{ filterCallback, filterModel }"
      class="max-w-[100px]"
    >
      <TableFilterControl
        v-model="filterModel.value"
        :name="column.field as string"
        :type="column.fieldType ?? 'text'"
        @keydown.enter="filterCallback()"
      />
    </template>

    <template #body="{ data }">
      <span v-if="column.dataGetter">{{ column.dataGetter!(data) }} </span>
      <component
        v-if="column.bodyComponent"
        :is="column.bodyComponent.component"
        v-bind="column.bodyComponent.props!(data)"
      />
    </template>
  </Column>
</template>
