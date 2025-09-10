<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import DonatesTables from "../molecules/donates.tables.vue";
import ExpenseTables from "../molecules/expense.tables.vue";

const { t } = useI18n();
</script>
<template>
  <div class="gap-2 min-w-full">
    <TabView>
      <TabPanel :header="t('donates')">
        <DonatesTables />
      </TabPanel>
      <TabPanel header-class="flex-1" :header="t('expenses')">
        <ExpenseTables />
      </TabPanel>
    </TabView>
  </div>
</template>
