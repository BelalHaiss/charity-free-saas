<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrimeVue } from 'primevue/config';
import { getPrimeLocaleOption } from './locales/locale.util';
import { useGlobalState } from './composables/use-global-state';
import { useRouter, useRoute } from 'vue-router/auto';
import TopNav from './components/organisms/layout/top-nav.vue';
import SideNav from './components/organisms/layout/side-nav.vue';

const { locale } = useI18n<any, 'ar' | 'en'>();
const primevue = usePrimeVue();
const isFirstRouteHandled = ref(false);
const { storage } = useGlobalState();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const { organization } = storage.value;
  isFirstRouteHandled.value = true;
  if (!organization) router.push('/setup');
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
</script>

<template>
  <div v-if="!isFirstRouteHandled" class="flex-center w-dvw h-dvh">
    <ProgressSpinner />
  </div>
  <div class="w-full h-dvh max-h-dvh flex flex-col gap-2 p-1">
    <TopNav />
    <Toast />

    <div class="flex gap-2 overflow-hidden flex-1">
      <SideNav />
      <main class="flex-1 max-h-full min-h-full overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import './assets/css/global.css';
@import 'primevue/resources/themes/aura-light-green/theme.css';
</style>
