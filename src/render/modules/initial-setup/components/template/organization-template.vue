<script setup lang="ts">
import NewOrganizationForm from '../organism/new-organization-form.vue';
import NewBranchForm from '../organism/new-branch-form.vue';
</script>

<template>
  <div class="flex flex-col gap-4">
    <NewOrganizationForm />
    <Divider />
    <NewBranchForm />
  </div>
</template>
