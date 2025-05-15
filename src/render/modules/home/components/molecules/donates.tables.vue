<script setup lang="ts">
import { Donate } from "@prisma/client";
import { TableColumns } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import { computed, inject, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { DayData } from "../../view-model/home-summary-view-mode";
import { ClientDonateWithRelations } from "@shared/types/donates/donates.dto";
import ViewDonateModal from "../template/view-donate-modal.vue";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import DeleteItemWithConfirmDialog from "@render/components/molecules/action-icon-with-confirm-dialog.vue";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import { useToast } from "@render/composables/use-toast";
import {
  QUERY_KEYS,
  useQueryHelper,
} from "@render/composables/use-query-typed";

const { t } = useI18n();
const { successToast, failedToast } = useToast();
const { invalidateQueries } = useQueryHelper();
const selectedDate = inject<Ref<Date, Date>>("currentSelectedDate");

const handleDeleteDonate = async (donate: Donate) => {
  try {
    await donateRepository.deleteDonateById(donate.id);
    await invalidateQueries(QUERY_KEYS.TRANSACTION(selectedDate!));

    successToast();
  } catch (e) {
    failedToast(e);
  }
};
const headers = computed<TableColumns<Donate>[]>(() => [
  {
    field: "donor",
    dataGetter: (donate) => donate.donor,
    header: t("donor"),
  },
  {
    field: "donor_phone",
    dataGetter: (donate) => donate.donor_phone ?? "",
    header: t("phone"),
  },
  {
    field: "created_by",
    dataGetter: (donate) => donate.created_by,
    header: t("user"),
  },
  {
    field: "created_at",
    dataGetter: (donate) => formatDate(donate.created_at, "yyyy-LL-dd"),
    header: t("date"),
  },
  {
    field: "delete",
    header: t("delete"),

    headerComponent: {
      component: IconRepository,
      props: { iconName: "filled-delete" },
    },
    bodyComponent: {
      component: DeleteItemWithConfirmDialog,
      props: (donate) => ({
        handleDelete: () => handleDeleteDonate(donate),
      }),
    },
  },
]);

const dayData = inject<Ref<DayData>>("dayData");

const donates = computed<Donate[]>(() => dayData?.value.donates ?? []);

const isDonateModalVisible = ref(true);
const selectedDonate = ref<ClientDonateWithRelations>();
const openDonateDialog = (data?: ClientDonateWithRelations) => {
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
    class=""
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
      <template v-if="column.headerComponent" #header>
        <component
          :is="column.headerComponent.component"
          v-bind="column.headerComponent.props"
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
  </DataTable>

  <ViewDonateModal
    v-if="selectedDonate && isDonateModalVisible"
    :donate="selectedDonate"
    v-model="isDonateModalVisible"
  />
</template>
