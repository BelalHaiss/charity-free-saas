<script setup lang="ts">
import { useConfirm } from "@render/composables/use-confirm";
import IconRepository from "../atoms/icon-repository.vue";
import ConfirmDialog from "../organisms/confirm-dialog.vue";

const props = defineProps<{ handleDelete(): Promise<unknown> }>();
const confirmProps = useConfirm(props.handleDelete, {
  confirmButtonSeverity: "danger",
});
</script>
<template>
  <Button class="px-2 py-1" severity="danger" @click="confirmProps.showDialog">
    <IconRepository class="text-lg" icon-name="filled-delete" />
  </Button>
  <ConfirmDialog v-bind="confirmProps" />
</template>
