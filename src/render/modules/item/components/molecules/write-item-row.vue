<script setup lang="ts">
import IconRepository from '@render/components/atoms/icon-repository.vue';
import { useItemRowContext } from '../../view-model/item-row.view-model';
import BigUnitDisplay from '../atoms/big-unit-display.vue';
import ActionIconWithConfirmDialog from '@render/components/molecules/action-icon-with-confirm-dialog.vue';
import IconButton from '@render/components/atoms/icon-button.vue';
import { useForm } from 'vee-validate';
import { CreateNewItem } from '@shared/types/benefit/benefit.dto';
import { toTypedSchema } from '@vee-validate/zod';
import { benefitItemSchema } from '@shared/services/schema/benefit.schema';
import { useTypedI18n } from '@render/composables/use-typed-i18n';
import CustomFormControl from '@render/components/molecules/form/custom-form-control.vue';
import CategorySelect from '@render/modules/category/components/atoms/category-select.vue';
import FormControl from '@render/components/molecules/form/form-control.vue';

const { draftItem, setMode, remove } = useItemRowContext();

const { locale } = useTypedI18n();
const { values, meta } = useForm<CreateNewItem>({
  initialValues: {
    branch_id: draftItem.value.branch_id,
    name: draftItem.value.name,
    category_id: draftItem.value.category?.id,
    unit_id: draftItem.value.unit?.id,
    qty: draftItem.value.qty
  },
  validationSchema: toTypedSchema(benefitItemSchema(locale.value))
});
</script>

<template>
  <td>
    <CustomFormControl
      v-bind="{
        label: 'item',
        name: 'category_id',
        type: 'select-number',
        hideLabel: true
      }"
    >
      <template #input="{ value }">
        <CategorySelect v-model="value!" />
      </template>
    </CustomFormControl>
  </td>
  <td>
    <FormControl hide-label type="text" label="content" name="name" />
  </td>
  <td>
    {{ draftItem.unit?.label }}
  </td>
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
