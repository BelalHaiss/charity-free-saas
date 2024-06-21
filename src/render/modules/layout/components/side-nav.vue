<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router/auto';
import IcBaselineLogout from '~icons/ic/baseline-logout';
import { TreeNode } from 'primevue/treenode';
import { TreeExpandedKeys } from 'primevue/tree';
import { useSideNav } from '../viewModel/useSideNav';
import LangMenu from '@render/components/atoms/lang-menu.vue';

const { navItems } = useSideNav();
const toggleNodeExpand = (node: TreeNode) => {
  const currentState = expandedItems.value[node.key!];
  expandedItems.value[node.key!] = !currentState;
};

const expandedItems = ref<TreeExpandedKeys>({});
</script>
<template>
  <nav
    class="absolute start-0 h-full bg-white rounded-2xl group py-4 px-2 w-[85px] transition-all duration-300 hover:w-[190px] shadow-xl z-50 overflow-hidden flex flex-col items-center"
  >
    <div class="flex-center mb-4 gap-2 w-full">
      <img src="@render/assets/images/logo.png" class="size-[60px]" />
      <span
        class="text-primary-color font-bold text-lg max-w-min text-center [word-spacing:100px] hidden group-hover:block"
      >
        {{ $t('shared.app_name') }}
      </span>
    </div>

    <div class="flex flex-1 gap-2 flex-col overflow-x-visible overflow-y-auto">
      <Tree
        :expanded-keys="expandedItems"
        :pt="{
          content: {
            class: 'flex-row-reverse     outline-none    overflow-hidden w-full'
          },
          label: {
            class: 'w-full max-w-full '
          },
          container: {
            class: 'flex flex-col gap-2    '
          },
          toggler: {
            class: 'hidden group-hover:flex '
          }
        }"
        :value="navItems"
      >
        <template #default="{ node }">
          <div
            class="cursor-pointer flex items-center font-medium gap-1 w-full text-gray-600 hover:text-primary-color"
            @click="toggleNodeExpand(node)"
          >
            <component
              :is="node.customIcon"
              class="group-hover:me-2 text-[25px] mx-auto group-hover:mx-0"
            >
            </component>
            <span role="button" class="hidden group-hover:block">
              {{ node.label }}
            </span>
          </div>
        </template>

        <template #child="{ node }">
          <RouterLink
            class="text-sm flex items-center font-medium hover:text-primary-color cursor-pointer w-full"
            :to="node.path"
          >
            <component
              class="group-hover:me-2 text-base mx-auto group-hover:mx-0"
              :is="node.customIcon"
            >
            </component>
            <span class="hidden group-hover:block">
              {{ node.label }}
            </span>
          </RouterLink>
        </template>
      </Tree>
    </div>
    <LangMenu />

    <div class="flex-center gap-2 mb-1 mt-auto border-t py-1">
      <Avatar :label="'U'" shape="circle" class="size-[25px]" />
      <span class="hidden group-hover:block"> Ahmed Met </span>

      <Button
        text
        class="rounded-full p-1 hidden group-hover:block"
        severity="danger"
      >
        <IcBaselineLogout class="ms-auto rtl:rotate-180" />
      </Button>
    </div>
  </nav>
</template>
