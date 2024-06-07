import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import '@fontsource/tajawal/300.css';
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/500.css';
import '@fontsource/tajawal/700.css';
import '@fontsource/tajawal/800.css';
import '@fontsource/tajawal/900.css';

import App from './App.vue';
import { i18nConfig } from './config/i18n';
const router = createRouter({
  history: createWebHistory()
  // the routes property is handled by the plugin
});

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  ripple: true
});
app.use(ToastService);
app.component('Toast', Toast);
app.use(i18nConfig);

app.mount('#app');
