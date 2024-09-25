<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
<template>
  <div class="bg-white font-semibold rounded-lg shadow-xl p-4">
    <span>
      {{ t("shared.item-deleted") }}
    </span>
  </div>
</template>
