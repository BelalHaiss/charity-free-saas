<script setup lang="ts">
import { Item } from "@prisma/client";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import { benefitRepository } from "@render/modules/benefits/repository/benefit.repository";
import TankStankTable from "@render/modules/dynamic-table/components/organism/tankstank.table.vue";
import { useDynamicTable } from "@render/modules/dynamic-table/useDynamicTable";
import UnitLabelSpan from "@render/modules/unit/components/atoms/unit-label-span.vue";
import {
  ItemBenefitsTableQuery,
  ItemIncludeCategoryAndBenefit,
} from "@shared/types/benefit/benefit.dto";
import { ColumnDef } from "@tanstack/vue-table";
import { computed } from "vue";

const pageSize = 15;
useDynamicTable<ItemIncludeCategoryAndBenefit, ItemBenefitsTableQuery>({
  queryFn: benefitRepository.getBenefitItems,
  initialQuery: {
    pagination: { page: 0, pageSize },
    filter: {},
  },
});
const { t } = useTypedI18n();
const headers = computed<ColumnDef<Item>[]>(() => [
  {
    header: t("category"),
    field: "category_id",
    accessorFn: (data) => data.category_id,
  },
  {
    header: t("item"),
    field: "name",
    dataGetter: (data) => data.name,
  },
  {
    header: t("unit"),
    field: "unit",
    bodyComponent: {
      component: UnitLabelSpan,
      props: (data) => ({
        unitId: data.unit_id,
      }),
    },
  },
  {
    header: t("qty"),
    field: "qty",
    dataGetter: (data) => data.qty,
  },
  {
    header: t("count", { label: t("beneficiaries") }),
    field: "benefit",
    dataGetter: (data) => data.benefit.beneficiaries_count,
  },
]);
</script>
<template>
  <TankStankTable :columns="headers">
    <template #table-body="{ rows }">
      <p v-for="item in rows" :key="item.id">
        {{ item.original.name }}
      </p>
    </template>
  </TankStankTable>
</template>
