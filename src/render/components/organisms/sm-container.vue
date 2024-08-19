<script setup lang="ts"></script>

<template>
  <div class="flex flex-col shadow-xl rounded-xl overflow-hidden">
    <div
      class="bg-emerald-300 border-b font-bold text-lg text-brand-900 py-2 px-6"
    >
      <slot name="header" />
    </div>
    <div class="bg-white">
      <slot name="main" />
    </div>
  </div>
</template>
