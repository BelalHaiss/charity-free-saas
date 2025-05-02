<script setup lang="ts">
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { useI18n } from "vue-i18n";
import { categoryRepository } from "../../repository/category.repository";
import { useGlobalState } from "@render/composables/use-global-state";
import { computed } from "vue";
import { SelectOptions } from "@render/types/form.types";
import { useQuery } from "@tanstack/vue-query";
const { t } = useI18n();

const { storage } = useGlobalState();
const branchId = computed(() => storage.value.branchId);
const { data: categories, isRefetching } = useQuery({
  queryKey: QUERY_KEYS.CATEGORY(branchId),
  queryFn: () => categoryRepository.findAll(branchId.value),
  initialData: [],
});

const categoriesOptions = computed<SelectOptions<number>[]>(
  () =>
    categories.value?.map((item) => ({ label: item.name, value: item.id })) ??
    [],
);
const selectedValue = defineModel<SelectOptions>();
</script>
<template>
  <Dropdown
    v-model="selectedValue"
    :loading="isRefetching"
    input-id="select"
    :options="categoriesOptions"
    filter
    option-label="label"
    :placeholder="t('select', { label: t('category') })"
    class="max-w-[300px] form-input"
    :pt="{
      filterContainer: {
        class: 'max-w-[300px] overflow-hidden  [&>input]:m-0',
      },
    }"
  >
    <template #option="slotProps">
      <div class="flex align-items-center ms-2">
        <span>{{ t(slotProps.option.label) }}</span>
      </div>
    </template>
  </Dropdown>
</template>
