<script setup lang="ts">
import { Item } from "@prisma/client";
import { DropdownFilterEvent } from "primevue/dropdown";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { itemRepository } from "../../repository/item.repository";
import { useToast } from "@render/composables/use-toast";
import { useDebounceFn } from "@vueuse/core";

const items = ref<Item[]>([]);

const { t } = useI18n();
const isLoading = ref(false);
const selectedItem = ref<Item>();

const emit = defineEmits<{
  (e: "setItem", item: Item): void;
}>();

watch(selectedItem, (newVal) => newVal && emit("setItem", newVal));

const { failedToast } = useToast();

const onFilter = useDebounceFn(async ({ value }: DropdownFilterEvent) => {
  // debounce
  try {
    // no value && reset items Ref
    if (!value) {
      items.value = selectedItem.value ? [selectedItem.value] : [];
      return;
    }
    // value && set loading && search on backend && setItems from result
    isLoading.value = true;
    const res = await itemRepository.getItemByName(value);
    items.value = selectedItem.value ? [selectedItem.value, ...res] : res;
  } catch (error) {
    failedToast(error);
  } finally {
    isLoading.value = false;
  }
});

watch(items, () => console.log({ items }));
</script>

<template>
  <div class="flex flex-col">
    <Dropdown
      v-model="selectedItem"
      :loading="isLoading"
      input-id="select"
      :options="items"
      :empty-filter-message="t('no-results-found')"
      filter
      option-label="name"
      :placeholder="
        t('search by', {
          label: t('name', { label: t('item') }),
        })
      "
      class="max-h-full"
      :pt="{
        filterContainer: {
          class: 'w-full overflow-hidden  [&>input]:m-0',
        },
      }"
      @filter="onFilter"
    >
      <template #option="slotProps">
        <div class="flex align-items-center ms-2">
          <span>{{ t(slotProps.option.name) }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
