<script setup lang="ts">
import SpinnerFullPage from "@render/components/molecules/spinner-full-page.vue";
import { useHomeSummary } from "../../view-model/home-summary-view-mode";
import HomeHeader from "../organsims/home-header.vue";
import HomeTabs from "../organsims/home-tabs.vue";

const { isLoading, dayData, selectedDate } = useHomeSummary();
</script>
<template>
  <SpinnerFullPage v-if="isLoading" />
  <div v-else class="flex flex-col gap-4 p-4 page-content flex-wrap">
    <HomeHeader v-model="selectedDate" v-bind="dayData" />

    <!-- tabs -->
    <HomeTabs />
  </div>
</template>
