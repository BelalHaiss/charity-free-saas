<script setup lang="ts">
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { useItemRowContext } from "../../view-model/item-row.view-model";
import BigUnitDisplay from "../atoms/big-unit-display.vue";
import ActionIconWithConfirmDialog from "@render/components/molecules/action-icon-with-confirm-dialog.vue";
import IconButton from "@render/components/atoms/icon-button.vue";

const { draftItem, setMode, remove } = useItemRowContext();
</script>

<template>
  <td>{{ draftItem.category?.name }}</td>
  <td>{{ draftItem.name }}</td>
  <td>{{ draftItem.unit?.label }}</td>
  <td>
    <BigUnitDisplay
      v-if="draftItem.qty && draftItem.unit"
      :qty="draftItem.qty"
      :unit="draftItem.unit"
    />
  </td>
  <td>{{ draftItem.benefit?.beneficiaries_count }}</td>
  <td>
    <IconButton
      :buttonProps="{ severity: 'secondary' }"
      @click="() => setMode('WRITE')"
    >
      <IconRepository class="text-lg" icon-name="edit" />
    </IconButton>
    <ActionIconWithConfirmDialog
      buttonSeverity="danger"
      :onConfirm="remove"
      confirmSeverity="danger"
      iconName="filled-delete"
    />
  </td>
</template>
