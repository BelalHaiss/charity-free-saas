<script setup lang="ts">
import CreatableSelect from "@render/components/molecules/creatable-select.vue";
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
const {
  data: categories,
  isRefetching,
  refetch,
} = useQuery({
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

const handleNewItem = async (categoryName: string) => {
  await categoryRepository.createCategory({
    name: categoryName,
    branch_id: branchId.value,
  });
  refetch();
};
</script>
<template>
  <CreatableSelect
    v-model="selectedValue"
    :label="t('shared.select', { label: t('shared.category') })"
    :handleNewItem="handleNewItem"
    :isLoading="isRefetching"
    :placeholder="t('shared.select', { label: t('shared.category') })"
    :options="categoriesOptions"
  />
</template>
