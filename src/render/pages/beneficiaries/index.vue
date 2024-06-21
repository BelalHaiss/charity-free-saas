<script setup lang="ts">
import BenefciariesMain from '@render/modules/beneficiaries/components/templates/benefciaries-main.vue';
import BreadCrump from '@render/modules/layout/components/bread-crump.vue';
</script>
<template>
  <BreadCrump
    :paths="[{ path: '/beneficiaries/', actualPath: '/beneficiaries/' }]"
  />

  <BenefciariesMain />
</template>
