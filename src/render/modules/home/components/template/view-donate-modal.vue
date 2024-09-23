<script setup lang="ts">
import { DonateWithRelations } from "@shared/types/donates/donates.dto";

const props = defineProps<{ donate: DonateWithRelations }>();

const isVisible = defineModel<boolean>();
</script>
<template>
  <Dialog v-model:visible="isVisible" modal class="w-full max-w-[700px]">
    <ViewDonorDetails v-bind="props" />
    <!-- <VieAmount v-if="!!props.transaction" v-bind="props.transaction" /> -->
  </Dialog>
</template>
o
