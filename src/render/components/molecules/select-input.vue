<script lang="ts" setup>
import { SelectOptions } from "@render/types/form.types";

type Props = {
  options: SelectOptions[];
  placeholder: string;
  label: string;
  isLoading: boolean;
};

const selectedValue = defineModel<SelectOptions>();
const { options, placeholder, label, isLoading } = defineProps<Props>();
</script>
<template>
  <div class="flex flex-col">
    <label for="select">{{ label }}</label>
    <Dropdown
      v-model="selectedValue"
      :loading="isLoading"
      input-id="select"
      :options="options"
      filter
      option-label="label"
      :placeholder="placeholder"
      class="max-w-[300px] form-input"
      :pt="{
        filterContainer: {
          class: 'max-w-[300px] overflow-hidden  [&>input]:m-0',
        },
      }"
    >
      <template #option="slotProps">
        <div class="flex align-items-center ms-2">
          <span>{{ $t(slotProps.option.label) }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
