<script setup lang="ts">
import ViewDonateAmount from "@render/modules/donate/components/organism/view-donate-amount.vue";
import ViewDonateItems from "@render/modules/donate/components/organism/view-donate-items.vue";
import ViewDonorDetails from "@render/modules/donate/components/organism/view-donor-details.vue";
import { ClientDonateWithRelations } from "@shared/types/donates/donates.dto";

const props = defineProps<{ donate: ClientDonateWithRelations }>();

const isVisible = defineModel<boolean>();
</script>
<template>
  <Dialog v-model:visible="isVisible" modal class="w-full max-w-[700px]">
    <div class="flex flex-col w-full gap-3">
      <ViewDonorDetails :donate="props.donate" />
      <ViewDonateAmount
        :transaction="props.donate.transaction"
        v-if="props.donate.transaction"
      />

      <ViewDonateItems
        :items="props.donate.donate_items"
        v-if="props.donate.donate_items.length"
      />
    </div>
  </Dialog>
</template>
