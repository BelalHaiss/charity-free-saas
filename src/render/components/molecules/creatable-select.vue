<script lang="ts" setup>
import { SelectOptions } from "@render/types/form.types";
import { ref } from "vue";

type Props = {
  options: SelectOptions[];
  placeholder?: string;
  label: string;
  isLoading: boolean;
  handleNewItem(newVal: string): void;
};

const selectedValue = defineModel<SelectOptions>();
const { options, placeholder, label, isLoading, handleNewItem } =
  defineProps<Props>();

const currentFilterValue = ref();
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
      @filter="(ev) => (currentFilterValue = ev.value)"
    >
      <template #option="slotProps">
        <div class="flex align-items-center ms-2">
          <span>{{ $t(slotProps.option.label) }}</span>
        </div>
      </template>
      <template #emptyfilter>
        <Button
          :outlined="true"
          class="py-1 max-w-[300px] overflow-hidden"
          @click="() => handleNewItem(currentFilterValue)"
        >
          {{ $t("shared.form.add_item") + " " + currentFilterValue }}
        </Button>
      </template>
    </Dropdown>
  </div>
</template>
