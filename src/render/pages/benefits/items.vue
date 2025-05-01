<script setup lang="ts">
import { Item } from "@prisma/client";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import { benefitRepository } from "@render/modules/benefits/repository/benefit.repository";
import TankStankTable from "@render/modules/dynamic-table/components/organism/tankstank.table.vue";
import { useDynamicTable } from "@render/modules/dynamic-table/useDynamicTable";
import ItemRow from "@render/modules/item/components/organisms/item-row.vue";
import { MutableTableRow } from "@render/types/table.types";
import { generateTempId } from "@render/utils/app.util";
import {
  ItemBenefitsTableQuery,
  ItemIncludeCategoryAndBenefit,
} from "@shared/types/benefit/benefit.dto";
import { ColumnDef, createColumnHelper } from "@tanstack/vue-table";
import { computed } from "vue";

const getNewItem = (): MutableTableRow<ItemIncludeCategoryAndBenefit> => ({
  isNew: true,
  id: generateTempId(),
  localId: generateTempId(),
});
const pageSize = 15;
useDynamicTable<ItemIncludeCategoryAndBenefit, ItemBenefitsTableQuery>({
  queryFn: benefitRepository.getBenefitItems,
  initialQuery: {
    pagination: { page: 0, pageSize },
    filter: {},
  },
  addNewItem: getNewItem,
});
const { t } = useTypedI18n();
const columnHelper =
  createColumnHelper<MutableTableRow<ItemIncludeCategoryAndBenefit>>();

const headers = computed<
  ColumnDef<MutableTableRow<ItemIncludeCategoryAndBenefit>>[]
>(() => [
  {
    header: t("category"),
    accessorKey: "category.name",
  },
  {
    header: t("item"),
    accessorKey: "name",
  },
  {
    header: t("unit"),
    accessorKey: "unit.name",
  },
  {
    header: t("qty"),
    accessorKey: "qty",
  },
  {
    header: t("count", { label: t("beneficiaries") }),
    accessorKey: "benefit",
  },
  columnHelper.display({
    header: t("_actions"),
    id: "actions",
  }),
]);
</script>
<template>
  <TankStankTable :columns="headers">
    <template #table-body="{ rows }">
      <ItemRow
        v-for="item in rows"
        :item="item.original"
        :key="item.original.localId"
      />
    </template>
  </TankStankTable>
</template>
