<script setup lang="ts">
import FormControl from '@render/components/molecules/form/form-control.vue';
import { useOrganizationForm } from '../../ViewModel/use-organization-vm';

const { fieldList } = useOrganizationForm();
</script>
<template>
  <form class="flex w-full flex-col gap-3">
    <FormControl v-for="item in fieldList" v-bind="item" :key="item.name" />
  </form>
</template>
