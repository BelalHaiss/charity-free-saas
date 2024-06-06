<script lang="ts" setup>
import {
  CreatableSelectOptions,
  FormFieldProps
} from '@render/types/form.types';
import { computed, ref, watch } from 'vue';

import { useField } from 'vee-validate';
import { MultiSelectProps } from 'primevue/multiselect';

const newOptionsCreated = ref<CreatableSelectOptions[]>([]);
const props = defineProps<FormFieldProps<MultiSelectProps>>();

const { value, errorMessage, setValue } = useField<CreatableSelectOptions[]>(
  () => props.name,
  undefined,
  { initialValue: [] }
);
const currentFilterValue = ref();
const handleNewItem = () => {
  const filterValue = currentFilterValue.value;

  const isAlreadyOption = value.value.some(
    (option) => option.value === filterValue
  );
  if (isAlreadyOption) return;
  const newFilterOption: CreatableSelectOptions = {
    label: filterValue,
    value: filterValue,
    isCreated: true
  };
  newOptionsCreated.value.push(newFilterOption);
  setValue([...value.value, newFilterOption]);
};

const maxSelectedCount = computed(
  () => props.inputProps.maxSelectedLabels ?? 0
);

const allOptions = computed(
  () =>
    props.inputProps.options!.concat(
      newOptionsCreated.value
    ) as CreatableSelectOptions[]
);
watch(value, () => console.log({ value }));
</script>
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <MultiSelect
      v-model="value"
      :options="allOptions"
      filter
      optionLabel="label"
      :placeholder="props.inputProps.placeholder"
      :selectedItemsLabel="
        $t('shared.form.max_selected', {
          count: value.length
        })
      "
      :maxSelectedLabels="maxSelectedCount"
      @filter="(ev) => (currentFilterValue = ev.value)"
      class="max-w-[300px] form-input"
      :pt="{
        filterContainer: {
          class: 'max-w-[300px] overflow-hidden'
        }
      }"
    >
      <template #option="slotProps">
        <div class="flex align-items-center ms-2">
          <span>{{ $t(slotProps.option.label) }}</span>
        </div>
      </template>
      <template #emptyfilter>
        <Button
          :outlined="true"
          @click="handleNewItem"
          class="py-1 max-w-[300px] overflow-hidden"
        >
          {{ $t('shared.form.add_item') + ' ' + currentFilterValue }}
        </Button>
      </template>
    </MultiSelect>
    <small class="text-red-500" v-if="errorMessage" :id="name + `-help`">{{
      $t(errorMessage)
    }}</small>
  </div>
</template>
import { T } from 'node_modules/unplugin-vue-router/dist/options-yBvUhD_i.mjs';
import { MultiSelectProps } from 'primevue/multiselect';
