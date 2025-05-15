<script setup lang="ts">
import SmContainer from "@render/components/organisms/sm-container.vue";

import { getCodeLabel } from "@render/modules/unit/utils/money-unit-utils";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";

const { t } = useI18n();

const { transaction } = defineProps<{ transaction: ClientTransaction }>();

// Find the specific unit for this transaction
const unit = computed(() => (transaction.Unit ? transaction.Unit : null));
</script>

<template>
  <SmContainer class="w-max mx-auto">
    <template #header>
      {{ t("monetary-donation") }}
    </template>

    <template #main>
      <div class="flex-center font-bold p-2 gap-2">
        <span> {{ transaction.amount }} </span>
        <span> {{ unit ? getCodeLabel(unit) : "" }}</span>
      </div>
    </template>
  </SmContainer>
</template>
