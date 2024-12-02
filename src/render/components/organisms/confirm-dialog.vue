<script setup lang="ts">
import { ConfirmReturn } from "@render/composables/use-confirm";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps<ConfirmReturn>();

const isSubmitting = computed(() => props.isSubmitting.value);
const isVisible = computed(() => props.isVisible.value);

const { t } = useI18n();
</script>

<template>
  <Dialog
    :visible="isVisible"
    modal
    :header="props.header"
    :closable="!isSubmitting"
    :style="{ width: '25rem' }"
  >
    <span class="p-text-secondary block mb-5">{{ description }}</span>

    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        :label="t('shared.cancel')"
        :disabled="isSubmitting"
        severity="secondary"
        @click="props.onCancel"
      />
      <Button
        type="button"
        :label="t('shared.confirm')"
        :loading="isSubmitting"
        :severity="props.confirmButtonSeverity"
        @click="props.onConfirm"
      />
    </div>
  </Dialog>
</template>
