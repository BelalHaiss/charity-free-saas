<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import HeroiconsSolidMenu from '~icons/heroicons-solid/menu';
import SideNav from './side-nav.vue';

const { locale } = useI18n();
const toggleDrawer = ref(false);
</script>
<template>
  <div class="lg:hidden">
    <Button @click="toggleDrawer = true" class="p-2">
      <HeroiconsSolidMenu />
    </Button>

    <Sidebar
      v-model:visible="toggleDrawer"
      class="max-w-[170px] p-0"
      :pt="{
        transition: {
          enterFromClass:
            locale === 'ar' ? 'translate-x-[500px]' : 'translate-x-[-500px]',
          leaveToClass:
            locale === 'ar' ? 'translate-x-[500px] ' : ' translate-x-[-500px]',
          leaveActiveClass: 'duration-500 ease-in-out',
          enterActiveClass: 'duration-500 ease-in-out'
        },
        content: {
          class: '  p-0   overflow-visible [&>nav]:max-w-full '
        }
      }"
    >
      <SideNav />
    </Sidebar>
  </div>
</template>
