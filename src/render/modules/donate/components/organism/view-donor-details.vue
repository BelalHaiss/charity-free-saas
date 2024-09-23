<script setup lang="ts">
import { Donate } from "@prisma/client";
import SmContainer from "@render/components/organisms/sm-container.vue";
import { FormField } from "@render/types/form.types";
import { TableHeader } from "@render/types/util.types";
import { formatDate } from "@render/utils/date.util";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<Donate>();

const donorFieldList: FormField<keyof NewDonate>[] = [
  {
    name: "donor",
    label: t("shared.donor"),
    type: "text",
  },
  {
    name: "donor_phone",
    label: t("shared.form.phone"),
    type: "text",
    inputProps: {
      type: "number",
    },
  },
  {
    name: "date",
    label: t("shared.date"),
    type: "date",
  },
];

const tableHeader = computed(
  (): ({ getter: (data: Donate) => string | number } & TableHeader)[] => [
    {
      label: t("shared.donor"),
      styles: { flex: 2 },
      getter: (data: Donate) => data.donor,
    },
    {
      label: t("shared.form.phone"),
      styles: { flex: 1 },
      getter: (data: Donate) => data.donor_phone ?? "",
    },
    {
      label: t("shared.date"),
      styles: { flex: 1 },
      getter: (data: Donate) => formatDate(data.created_at, "tt"),
    },
  ],
);
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("shared.donor") }}
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

          <span> {{ header.getter(props) }} </span>
        </div>
      </div>
    </template>
  </SmContainer>
</template>
