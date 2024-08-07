<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import CategorySelect from "@render/modules/category/components/atoms/category-select.vue";
import SelectItemUnit from "@render/modules/unit/components/atoms/select-item-unit.vue";
import { SelectOptions } from "@render/types/form.types";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "@render/composables/use-toast";
import TextInput from "@render/components/molecules/text-input.vue";
import { sleep } from "@render/utils/dev.util";
import { NewTransaction } from "@shared/types/transaction/transaction.dto";
const isVisible = ref(true);
const { t } = useI18n();
const { storage } = useGlobalState();
const unitValue = ref<SelectOptions<number>>();
const itemName = ref("");
const newItemData = ref<NewTransaction>({
  branch_id: storage.value.branchId,
  amount: 0,
  created_by: storage.value.user.username,
  type: "EXPENSE",
  unit_id: 0,
  label: "",
});

// watch([itemName, unitValue], (newVal) => {
//   newItemData.value.name = newVal[1];
//   newItemData.value.unit_id = newVal[2]?.value ?? 0;
// });
const { invalidDataToast, failedToast, successToast } = useToast();
const isSubmiting = ref(false);
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[600px]"
    :header="t('shared.add', { label: t('shared.item') })"
  >
    <div class="flex flex-col flex-center gap-3">
      <TextInput
        v-model="itemName"
        :label="t('shared.name', { label: t('shared.item') })"
        name="item_name"
      />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmiting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("shared.cancel") }}
        </Button>
        <Button :loading="isSubmiting" type="button">
          {{ t("shared.save") }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
