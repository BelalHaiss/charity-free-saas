<script setup lang="ts">
import FormControl from "@render/components/molecules/form/form-control.vue";
import SmContainer from "@render/components/organisms/sm-container.vue";
import { FormField } from "@render/types/form.types";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("shared.donor") }}
    </template>

    <template #main>
      <div class="flex p-2 items-center gap-2">
        <FormControl
          v-for="item in donorFieldList"
          v-bind="item"
          :key="item.name"
        />
      </div>
    </template>
  </SmContainer>
</template>
