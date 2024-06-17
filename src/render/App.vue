<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrimeVue } from 'primevue/config';
import { getPrimeLocaleOption } from './locales/locale.util';
import { useGlobalState } from './composables/use-global-state';
import { useRouter, useRoute } from 'vue-router/auto';
import SideNav from './modules/layout/components/side-nav.vue';

const { locale } = useI18n<any, 'ar' | 'en'>();
const primevue = usePrimeVue();
const isFirstRouteHandled = ref(false);
const { storage } = useGlobalState();
const router = useRouter();
const route = useRoute();

watch(route, () => {
  console.log({ route });
});

onMounted(() => {
  const { organization } = storage.value;
  isFirstRouteHandled.value = true;
  // if (!organization) router.push('/setup');
});
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

const isSetupPage = computed(() => route.fullPath === '/setup');
</script>

<template>
  <div v-if="!isFirstRouteHandled" class="flex-center w-dvw h-dvh">
    <ProgressSpinner />
  </div>

  <SideNav v-if="!isSetupPage" />

  <Toast />
  <main
    class="w-full h-full p-1 flex-1"
    :class="!isSetupPage ? 'page-container ms-[85px]' : ''"
  >
    <RouterView />
  </main>
</template>

<style>
@import './assets/css/global.css';
@import 'primevue/resources/themes/aura-light-green/theme.css';
</style>
