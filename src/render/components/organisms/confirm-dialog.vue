<script setup lang="ts">
import { ConfirmDialogProps } from '@render/composables/use-confirm';
import { computed } from 'vue';
const props = defineProps<ConfirmDialogProps>();

const isSubmitting = computed(() => props.isSubmitting.value);
const isVisible = computed(() => props.isVisible.value);
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
        :label="$t('shared.cancel')"
        :disabled="isSubmitting"
        severity="secondary"
        @click="props.onCancel"
      ></Button>
      <Button
        type="button"
        :label="$t('shared.confirm')"
        :loading="isSubmitting"
        @click="props.onConfirm"
      ></Button>
    </div>
  </Dialog>
</template>
