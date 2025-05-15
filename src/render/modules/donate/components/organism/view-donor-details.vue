<script setup lang="ts">
import { Donate } from "@prisma/client";
import SmContainer from "@render/components/organisms/sm-container.vue";
import { TableHeader } from "@render/types/util.types";
import { formatDate } from "@render/utils/date.util";
import { ClientDonateWithRelations } from "@shared/types/donates/donates.dto";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{ donate: ClientDonateWithRelations }>();

const tableHeader = computed(
  (): ({
    getter: (data: ClientDonateWithRelations) => string | number;
  } & TableHeader)[] => [
    {
      label: t("donor"),
      styles: { flex: 2 },
      getter: (data: ClientDonateWithRelations) => data.donor,
    },
    {
      label: t("form.phone"),
      styles: { flex: 1 },
      getter: (data: ClientDonateWithRelations) => data.donor_phone ?? "",
    },
    {
      label: t("date"),
      styles: { flex: 1 },
      getter: (data: ClientDonateWithRelations) =>
        formatDate(data.created_at, "tt"),
    },
  ],
);
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("donor") }}
    </template>

    <template #main>
      <div class="flex p-2 items-center gap-2">
        <div
          v-for="header in tableHeader"
          :key="header.label"
          :style="header.styles"
          class="flex flex-col"
          style=""
        >
          <span class="font-semibold"> {{ header.label }}</span>

          <span> {{ header.getter(props.donate) }} </span>
        </div>
      </div>
    </template>
  </SmContainer>
</template>
