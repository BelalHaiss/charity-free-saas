<script setup lang="ts">
const selectedDate = defineModel<Date>();
const { label } = defineProps<{ label: string }>();
</script>
<template>
  <div>
    <label for="date-filter" class="font-bold block mb-2">
      {{ label }}
    </label>
    <Calendar
      v-model="selectedDate"
      dateFormat="dd/mm/yy"
      class="h-8"
      style="direction: ltr"
      showIcon
      selectedDate="input"
      inputId="date-filter"
    />
  </div>
</template>
