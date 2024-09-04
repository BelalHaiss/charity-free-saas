<script setup lang="ts">
import { Item } from "@prisma/client";
import AddBtnIcon from "@render/components/atoms/add-btn-icon.vue";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import SmContainer from "@render/components/organisms/sm-container.vue";
import SearchItem from "@render/modules/item/components/atoms/search-item.vue";
import SelectItemUnitSize from "@render/modules/unit/components/atoms/select-item-unit-size.vue";
import { TableHeader } from "@render/types/util.types";
import { PartialDonateItem } from "@shared/types/donates/donates.dto";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const getEmptyItem = (): PartialDonateItem => ({
  item_id: undefined,
  tempId: Math.random(),
  unit_value: 1,
  unitSize: undefined,
});

const addedItems = ref<PartialDonateItem[]>([]);

const addNewEmptyItem = () => addedItems.value.push(getEmptyItem());
const emit = defineEmits<{
  (e: "setItems", items: PartialDonateItem[]): void;
}>();
watch(addedItems, (newItems) => emit("setItems", newItems));

const tableHeader = computed((): TableHeader[] => [
  {
    label: t("shared.item"),
    styles: { flex: 2 },
  },
  {
    label: t("shared.unit"),
    styles: { flex: 1 },
  },
  {
    label: t("shared.value"),
    styles: { flex: 1 },
  },
]);

const onUpdateValue = <K extends keyof PartialDonateItem>(
  key: K,
  updatedValue: PartialDonateItem[K],
  tempId: string | number,
) => {
  addedItems.value = addedItems.value.map((oldItem) =>
    oldItem.tempId === tempId ? { ...oldItem, [key]: updatedValue } : oldItem,
  );
};

const onSelectItem = (selectedItem: Item, tempId: string | number) => {
  addedItems.value = addedItems.value.map((oldItem) =>
    oldItem.tempId === tempId
      ? {
          ...oldItem,
          item_id: selectedItem.id,
          unitSize: "LG",
          unitId: selectedItem.unit_id,
        }
      : oldItem,
  );
};

const removeItem = (tempId: number | string) => {
  addedItems.value = addedItems.value.filter(
    (oldItem) => oldItem.tempId !== tempId,
  );
};
</script>
<template>
  <SmContainer class="min-w-full">
    <template #header>
      {{ t("shared.monetary-donation") }}
    </template>

    <template #main>
      <div class="flex flex-col p-2 items-center gap-2 [&>div]:w-full">
        <div class="flex items-center w-full gap-2">
          <span
            v-for="head in tableHeader"
            :key="head.label"
            class="bg-gray-200 text-black rounded-md text-center"
            :style="head.styles"
          >
            {{ head.label }}
          </span>
          <IconRepository icon-name="filled-delete" />
        </div>

        <div
          class="flex items-center gap-2"
          v-for="(item, index) in addedItems"
          :key="item.tempId"
        >
          <SearchItem
            class="flex-[2] h-[35px]"
            @set-item="
              (selectedItem) => onSelectItem(selectedItem, item.tempId)
            "
          />

          <div class="flex-1 h-[35px] overflow-hidden">
            <SelectItemUnitSize
              class="max-w-full flex box-border max-h-full"
              :unit-id="item.unitId"
              @set-unit-size="
                (selectedSize) =>
                  onUpdateValue('unitSize', selectedSize, item.tempId)
              "
            />
          </div>

          <div class="flex-1 h-[35px] overflow-hidden">
            <InputNumber
              class="max-w-full flex box-border max-h-full"
              input-class="w-full"
              :invalid="addedItems[index].unit_value! <= 0"
              v-model="addedItems[index].unit_value"
              :use-grouping="false"
            />
          </div>
          <IconRepository
            class="min-w-max text-red-500 cursor-pointer"
            @click="() => removeItem(item.tempId)"
            icon-name="filled-delete"
          />
        </div>

        <AddBtnIcon @click="addNewEmptyItem" />
      </div>
    </template>
  </SmContainer>
</template>
