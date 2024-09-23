<script setup lang="ts">
import { MoneyUnit, Transaction } from "@prisma/client";
import SmContainer from "@render/components/organisms/sm-container.vue";
import { useGlobalState } from "@render/composables/use-global-state";
import { getCodeLabel } from "@render/modules/unit/utils/money-unit-utils";
import { DonateWithRelations } from "@shared/types/donates/donates.dto";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const transaction = defineProps<Transaction>();
const { getters } = useGlobalState();

const unit = computed(() => getters.getMoneyUnitById(transaction.id)!);
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("shared.monetary-donation") }}
    </template>

    <template #main>
      <div class="flex font-bold p-2 items-center gap-1">
        <span> {{ transaction.amount }} </span>
        <span> {{ getCodeLabel(unit) }}</span>
      </div>
    </template>
  </SmContainer>
</template>
