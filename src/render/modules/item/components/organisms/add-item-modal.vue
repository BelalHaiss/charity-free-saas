<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import CategorySelect from "@render/modules/category/components/atoms/category-select.vue";
import SelectItemUnit from "@render/modules/unit/components/atoms/select-item-unit.vue";
import { SelectOptions } from "@render/types/form.types";
import { CreateNewItem } from "@shared/types/item/item.dto";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { newItemSchema } from "../../util/item.schema";
import { useToast } from "@render/composables/use-toast";
import TextInput from "@render/components/molecules/text-input.vue";
import { itemRepository } from "../../repository/item.repository";
const isVisible = ref(true);
const { t } = useI18n();
const { storage } = useGlobalState();
const categoryValue = ref<SelectOptions<number>>();
const unitValue = ref<SelectOptions<number>>();
const itemName = ref("");
const newItemData = ref<CreateNewItem>({
  qty: 0,
  branch_id: storage.value.branchId,
  category_id: 0,
  unit_id: 0,
  name: "",
});

watch([categoryValue, itemName, unitValue], (newVal) => {
  newItemData.value.category_id = newVal[0]?.value ?? 0;
  newItemData.value.name = newVal[1];
  newItemData.value.unit_id = newVal[2]?.value ?? 0;
});
const { invalidDataToast, failedToast, successToast } = useToast();
const isSubmiting = ref(false);
const createItem = async () => {
  const { error } = newItemSchema.safeParse(newItemData.value);
  if (error) {
    invalidDataToast();
    return;
  }
  try {
    await itemRepository.createItem(newItemData.value);
    isSubmiting.value = true;
    successToast();
    isVisible.value = false;
  } catch (error) {
    console.error({ error });
    failedToast();
  } finally {
    isSubmiting.value = true;
  }
};
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[600px]"
    :header="t('shared.add', { label: t('shared.item') })"
  >
    <div class="flex flex-col flex-center gap-3">
      <CategorySelect v-model="categoryValue" class="w-[300px]" />

      <TextInput
        v-model="itemName"
        :label="t('shared.name', { label: t('shared.item') })"
        name="item_name"
      />
      <SelectItemUnit v-model="unitValue" class="w-[300px]" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmiting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("shared.cancel") }}
        </Button>
        <Button :loading="isSubmiting" type="button" @click="createItem()">
          {{ t("shared.save") }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
