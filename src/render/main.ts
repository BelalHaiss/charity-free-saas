import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

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
