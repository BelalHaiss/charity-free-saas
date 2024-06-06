<script setup lang="ts">
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrimeVue } from 'primevue/config';
import { getPrimeLocaleOption } from './locales/locale.util';

const { locale } = useI18n<any, 'ar' | 'en'>();
const primevue = usePrimeVue();

watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr';
  if (primevue.config.locale) {
    primevue.config.locale.dayNamesMin = getPrimeLocaleOption(
      locale.value,
      'dayNamesMin'
    );
    primevue.config.locale.monthNamesShort = getPrimeLocaleOption(
      locale.value,
      'monthNamesShort'
    );
    primevue.config.locale.monthNames = getPrimeLocaleOption(
      locale.value,
      'monthNames'
    );
  }
});
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style>
@import './assets/css/global.css';
@import 'primevue/resources/themes/aura-light-green/theme.css';
</style>
