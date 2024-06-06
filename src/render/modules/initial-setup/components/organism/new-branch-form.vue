<script setup lang="ts">
import FormControl from '@render/components/molecules/form/form-control.vue';
import { useBranchForm } from '../../ViewModel/use-branch-vm';

const { fieldList } = useBranchForm();
</script>
<template>
  <div class="flex flex-col gap-2">
    <p class="font-bold capitalize">
      {{ $t('shared.details', { label: $t('organization.main_branch') }) }}
    </p>
    <form
      class="flex w-full bg-gray-50/50 flex-col gap-3 border p-2 rounded-xl"
    >
      <FormControl v-for="item in fieldList" v-bind="item" :key="item.name" />
    </form>
  </div>
</template>
