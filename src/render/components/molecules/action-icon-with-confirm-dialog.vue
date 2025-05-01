<script setup lang="ts">
import { useConfirm } from "@render/composables/use-confirm";
import IconRepository from "../atoms/icon-repository.vue";
import ConfirmDialog from "../organisms/confirm-dialog.vue";
import type { ButtonProps } from "primevue/button";
import { IconName } from "@render/utils/icon-map";
import IconButton from "../atoms/icon-button.vue";

const props = defineProps<{
  onConfirm: () => Promise<unknown>;
  iconName: IconName;
  buttonClass?: string;
  buttonSeverity: ButtonProps["severity"];
  confirmSeverity: ButtonProps["severity"];
  header?: string;
  description?: string;
}>();

const confirmProps = useConfirm(props.onConfirm, {
  header: props.header,
  description: props.description,
  confirmButtonSeverity: props.confirmSeverity,
});
</script>

<template>
  <IconButton
    :buttonProps="{ severity: 'danger' }"
    @click="confirmProps.showDialog"
  >
    <IconRepository class="text-lg" :icon-name="props.iconName" />
  </IconButton>
  <ConfirmDialog v-bind="confirmProps" />
</template>
