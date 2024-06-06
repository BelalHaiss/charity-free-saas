<script setup lang="ts">
import FlagSa4x3 from '~icons/flag/sa-4x3';
import FlagGb4x3 from '~icons/flag/gb-4x3';
const { locale } = defineProps<{
  locale: 'en' | 'ar';
}>();

const localLabel = {
  ar: 'عر',
  en: 'EN'
};
const localeFlag = {
  ar: FlagSa4x3,
  en: FlagGb4x3
};
</script>

<template>
  <Button
    severity="secondary"
    text
    class="flex gap-2 px-2 text-lg py-0"
    dir="ltr"
  >
    <component :is="localeFlag[locale]"> </component>
    {{ localLabel[locale] }}
  </Button>
</template>
