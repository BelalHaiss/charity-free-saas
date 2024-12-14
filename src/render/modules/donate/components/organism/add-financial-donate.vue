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

const { getters } = useGlobalState();
const moneyUnit = ref<MoneyUnit>(getters.getMoneyUnitByEnCode("EGP")!);
const { value: amount } = useField<NewDonate["financialTransaction"]["amount"]>(
  "financialTransaction.amount",
);
const { value: unitId } = useField<
  NewDonate["financialTransaction"]["unit_id"]
>("financialTransaction.unit_id", {}, { initialValue: moneyUnit.value.id });

watch(moneyUnit, (newVal) => {
  unitId.value = newVal.id;
});
</script>

<template>
  <SmContainer>
    <template #header>
      {{ t("shared.monetary-donation") }}
    </template>

    <template #main>
      <div class="flex p-2 items-center gap-2">
        <!-- <MoneyInput v-model:unit="moneyUnit" v-model:value="amount as number" /> -->
      </div>
    </template>
  </SmContainer>
</template>
