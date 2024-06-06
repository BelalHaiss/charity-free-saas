<script setup lang="ts">
import FormControl from '@render/components/molecules/form/form-control.vue';
import { useAdminForm } from '../../ViewModel/use-admin-vm';

const { fieldList } = useAdminForm();
</script>
<template>
  <div class="flex flex-col gap-2">
    <form
      class="flex w-full bg-gray-50/50 flex-col gap-3 border p-2 rounded-xl"
    >
      <FormControl v-for="item in fieldList" v-bind="item" :key="item.name" />
    </form>
  </div>
</template>
