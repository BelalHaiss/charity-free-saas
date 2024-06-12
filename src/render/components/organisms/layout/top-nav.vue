<script setup lang="ts">
import LangMenu from '@render/components/atoms/lang-menu.vue';
import UserAvatarHeader from '@render/components/molecules/user-avatar-header.vue';
import HeroiconsSolidMenu from '~icons/heroicons-solid/menu';
import LaHandsHelping from '~icons/la/hands-helping';
</script>
<template>
  <header class="w-full bg-gray-50 p-3 gap-4 flex items-center justify-around">
    <div class="lg:hidden">
      <Button class="p-2"> <HeroiconsSolidMenu /> </Button>
    </div>
    <div class="flex items-center gap-2">
      <Button outlined class="p-2">
        <LaHandsHelping class="text-2xl" />
      </Button>
      <span class="text-xl font-bold"> {{ $t('shared.app_name') }}</span>
    </div>

    <div class="flex items-center gap-2">
      <LangMenu />
      <UserAvatarHeader />
    </div>
  </header>
</template>
