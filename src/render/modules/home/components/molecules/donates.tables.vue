<script setup lang="ts">
import { Donate } from "@prisma/client";
import { TableColumns } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import { computed, inject, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { DayData } from "../../view-model/home-summary-view-mode";
import { DonateWithRelations } from "@shared/types/donates/donates.dto";
import ViewDonateModal from "../template/view-donate-modal.vue";

const { t } = useI18n();
const headers = computed<TableColumns<Donate>[]>(() => [
  {
    field: "donor",
    dataGetter: (donate) => donate.donor,
    header: t("shared.donor"),
  },
  {
    field: "donor_phone",
    dataGetter: (donate) => donate.donor_phone ?? "",
    header: t("shared.phone"),
  },
  {
    field: "created_by",
    dataGetter: (donate) => donate.created_by,
    header: t("shared.user"),
  },
  {
    field: "created_at",
    dataGetter: (donate) => formatDate(donate.created_at, "yyyy-LL-dd"),
    header: t("shared.date"),
  },
]);

const dayData = inject<Ref<DayData>>("dayData");

const donates = computed<Donate[]>(() => dayData?.value.donates ?? []);

const isDonateModalVisible = ref(true);
const selectedDonate = ref<DonateWithRelations>();
const openDonateDialog = (data?: DonateWithRelations) => {
  if (!data) return;
  isDonateModalVisible.value = true;
  selectedDonate.value = data;
};
// fetch data
</script>
<template>
  <DataTable
    :rows="donates.length"
    :value="donates"
    showGridlines
    lazy
    :pt="{
      bodyRow: {
        class: 'cursor-pointer   transition-all hover:bg-gray-100 ',
      },
    }"
    paginator
    @row-click="(event) => openDonateDialog(event.data)"
  >
    <Column
      v-for="column in headers"
      :key="column.header"
      :field="column.field"
      :show-filter-match-modes="false"
      :show-filter-menu="false"
      :header="column.header"
    >
      <template #body="{ data }">
        <span> {{ column.dataGetter(data) }} </span>
      </template>
    </Column>
  </DataTable>

  <ViewDonateModal
    v-if="selectedDonate && isDonateModalVisible"
    :donate="selectedDonate"
    v-model="isDonateModalVisible"
  />
</template>
