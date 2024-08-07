<script setup lang="ts">
import HomeTemplate from "@render/modules/home/components/templates/home.template.vue";
import AddExpenseModal from "@render/modules/transaction/components/organisms/add-expense.modal.vue";
</script>

<template>
  <div class="page-container">
    <HomeTemplate />
    <AddExpenseModal />
  </div>
</template>
