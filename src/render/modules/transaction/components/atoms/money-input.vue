<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";
import FormControlWrapper from "@render/components/molecules/form/form-control-wrapper.vue";
import { useGlobalState } from "@render/composables/use-global-state";
import MoneyUnitSelect from "@render/modules/unit/components/atoms/money-unit-select.vue";
import { useField } from "vee-validate";
import { ref, watch } from "vue";

const { getters } = useGlobalState();
const props = defineProps<{
  moneyUnitFieldName: string;
  amountFieldName: string;
}>();

const { value: amountValue, errorMessage: amountErrorMessage } =
  useField<number>(() => props.amountFieldName);

const { setValue: setMoneyUnitValue, errorMessage: moneyUnitErrorMessage } =
  useField<number>(() => props.moneyUnitFieldName);

const moneyUnit = ref<MoneyUnit>(getters.getMoneyUnitByEnCode("EGP")!);

watch(moneyUnit, (newMoneyUnit) => setMoneyUnitValue(newMoneyUnit.id), {
  immediate: true,
});
</script>
<template>
  <div class="flex w-[300px]">
    <FormControlWrapper
      :error-message="amountErrorMessage"
      :name="props.amountFieldName"
      hideLabel
      label="amount"
    >
      <template #input>
        <InputNumber
          class="max-h-[45px]"
          v-model="amountValue"
          :inputId="props.amountFieldName"
          inputClass="border-e-0 rounded-e-none"
          :useGrouping="false"
        />
      </template>
    </FormControlWrapper>

    <FormControlWrapper
      :error-message="moneyUnitErrorMessage"
      :name="props.moneyUnitFieldName"
      hideLabel
      label="Unit"
    >
      <template #input>
        <MoneyUnitSelect v-model="moneyUnit" />
      </template>
    </FormControlWrapper>
  </div>
</template>
