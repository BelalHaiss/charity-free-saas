<!-- <script setup lang="ts">
import { useGlobalState } from '@render/composables/use-global-state';
import CategorySelect from '@render/modules/category/components/atoms/category-select.vue';
import SelectItemUnit from '@render/modules/unit/components/atoms/select-item-unit.vue';
import { SelectOptions } from '@render/types/form.types';
import { CreateNewItem } from '@shared/types/item/item.dto';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from '@render/composables/use-toast';
import TextInput from '@render/components/molecules/text-input.vue';
import { sleep } from '@render/utils/dev.util';
const isVisible = ref(true);
const { t } = useI18n();
const { storage } = useGlobalState();
const unitValue = ref<SelectOptions<number>>();
const itemName = ref('');
const newItemData = ref<CreateNewItem>({
  qty: 0,
  branch_id: storage.value.branchId,
  category_id: 0,
  unit_id: 0,
  name: ''
});

// watch([itemName, unitValue], (newVal) => {
//   newItemData.value.name = newVal[1];
//   newItemData.value.unit_id = newVal[2]?.value ?? 0;
// });
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
    await sleep(500);
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
      <CategorySelect class="w-[300px]" v-model="categoryValue" />

      <TextInput
        v-model="itemName"
        :label="t('shared.name', { label: t('shared.item') })"
        name="item_name"
      />
      <SelectItemUnit class="w-[300px]" v-model="unitValue" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmiting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t('shared.cancel') }}
        </Button>
        <Button :loading="isSubmiting" type="button" @click="createItem()">
          {{ t('shared.save') }}
        </Button>
      </div>
    </div>
  </Dialog>
</template> -->
