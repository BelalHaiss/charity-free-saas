<script setup lang="ts">
import RefPropUpdate from "@render/components/test/ref-prop-update.vue";
import { isDevMode } from "@render/utils/app.util";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router/auto";
const router = useRouter();
onBeforeMount(() => {
  if (!isDevMode) {
    router.replace("/");
  }
});
const arr = ref([
  { name: "belal", count: 2 },
  { count: 5, name: "ahmed" },
]);

watch(
  arr,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  { deep: true },
);
</script>
<template>
  <div>
    <!-- <RefPropUpdate v-for="item in arr" v-bind="item" :key="item.name" /> -->
    <p
      v-for="item in arr"
      :key="item.name"
      @click="
        () => {
          item.name = 'hamada';
        }
      "
    >
      {{ item.name }} "
    </p>
  </div>
</template>
