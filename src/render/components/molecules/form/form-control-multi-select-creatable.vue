<script lang="ts" setup>
import {
  CreatableSelectOptions,
  FormFieldProps,
} from "@render/types/form.types";
import { computed, ref, watch } from "vue";

import { useField } from "vee-validate";
import { MultiSelectProps } from "primevue/multiselect";
import { useI18n } from "vue-i18n";

const newOptionsCreated = ref<CreatableSelectOptions[]>([]);
const props = defineProps<FormFieldProps<MultiSelectProps>>();
const { t } = useI18n();

const { value, errorMessage, setValue } = useField<CreatableSelectOptions[]>(
  () => props.name,
  undefined,
  { initialValue: [] },
);
const currentFilterValue = ref();
const handleNewItem = () => {
  const filterValue = currentFilterValue.value;

  const isAlreadyOption = value.value.some(
    (option) => option.value === filterValue,
  );
  if (isAlreadyOption) return;
  const newFilterOption: CreatableSelectOptions = {
    label: filterValue,
    value: filterValue,
    isCreated: true,
  };
  newOptionsCreated.value.push(newFilterOption);
  setValue([...value.value, newFilterOption]);
};

const maxSelectedCount = computed(
  () => props.inputProps.maxSelectedLabels ?? 0,
);

const allOptions = computed(
  () =>
    props.inputProps.options!.concat(
      newOptionsCreated.value,
    ) as CreatableSelectOptions[],
);
</script>
<template>
  <MultiSelect
    v-model="value"
    :options="allOptions"
    filter
    option-label="label"
    :placeholder="props.inputProps.placeholder"
    :selected-items-label="
      t('shared.form.max_selected', {
        count: value.length,
      })
    "
    :max-selected-labels="maxSelectedCount"
    class="max-w-[300px] form-input"
    :pt="{
      filterContainer: {
        class: 'max-w-[300px] overflow-hidden',
      },
    }"
    @filter="(ev) => (currentFilterValue = ev.value)"
  >
    <template #option="slotProps">
      <div class="flex align-items-center ms-2">
        <span>{{ t(slotProps.option.label) }}</span>
      </div>
    </template>
    <template #emptyfilter>
      <Button
        :outlined="true"
        class="py-1 max-w-[300px] overflow-hidden"
        @click="handleNewItem"
      >
        {{ t("shared.form.add_item") + " " + currentFilterValue }}
      </Button>
    </template>
  </MultiSelect>
</template>
