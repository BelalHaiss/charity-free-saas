<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";
import SmContainer from "@render/components/organisms/sm-container.vue";
import { useGlobalState } from "@render/composables/use-global-state";
import MoneyInput from "@render/modules/transaction/components/atoms/money-input.vue";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { useField } from "vee-validate";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("shared.monetary-donation") }}
    </template>

    <template #main>
      <div class="flex p-2 items-center gap-2">
        <MoneyInput
          money-unit-field-name="financialTransaction.unit_id"
          amount-field-name="financialTransaction.amount"
        />
      </div>
    </template>
  </SmContainer>
</template>
