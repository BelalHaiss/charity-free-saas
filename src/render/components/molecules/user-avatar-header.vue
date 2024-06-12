<script setup lang="ts">
import Menu from 'primevue/menu';
import { MenuItem } from 'primevue/menuitem';
import { VNodeRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router/auto';
import IonIosCloseCircle from '~icons/ion/ios-close-circle';
const { t } = useI18n();
const menuRef = ref<Menu>();
const router = useRouter();

const items = ref<MenuItem[]>([
  {
    label: t('shared.account'),
    command: () => router.push('/profile')
  },
  {
    separator: true
  }
]);
const toggle = (event) => menuRef.value!.toggle(event);
</script>
<template>
  <Avatar
    aria-haspopup="true"
    aria-controls="overlay_menu"
    label="V"
    class="cursor-pointer"
    size="normal"
    @click="toggle"
    shape="circle"
  />
  <Menu
    popup
    id="overlay_menu"
    class="min-w-min w-[100px]"
    ref="menuRef"
    :model="items"
  >
    <template #end>
      <Button text severity="danger" class="w-full p-1">
        {{ $t('shared.logout') }}
        <IonIosCloseCircle class="ms-auto" />
      </Button>
    </template>
  </Menu>
</template>
