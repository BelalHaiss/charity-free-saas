<script setup lang="ts">
import langMenu from "@render/components/atoms/lang-menu.vue";
import ConfirmDialog from "@render/components/organisms/confirm-dialog.vue";
import { useInitialSetup } from "@render/modules/initial-setup/ViewModel/use-initial-setup-vm";
import InitialMessage from "@render/modules/initial-setup/components/atoms/initial-message.vue";
import AdminForm from "@render/modules/initial-setup/components/organism/admin-form.vue";
import OrganizationTemplate from "@render/modules/initial-setup/components/template/organization-template.vue";
import { useI18n } from "vue-i18n";
const { confirmProps, isFormsValid } = useInitialSetup();

const { t } = useI18n();
</script>
<template>
  <div class="p-2 md:p-4 flex flex-col page-content relative">
    <ConfirmDialog v-bind="confirmProps" />
    <div class="flex-center gap-2">
      <langMenu />

      <InitialMessage class="flex-1 mt-4 max-w-[600px]" />
    </div>
    <div class="flex-1 w-full flex justify-content-center">
      <Stepper linear class="w-full">
        <StepperPanel
          :header="t('shared.details', { label: t(`shared.organization`) })"
        >
          <template #content="{ nextCallback }">
            <OrganizationTemplate />
            <div class="flex pt-4 justify-content-end">
              <Button
                :label="t('shared.next')"
                :disabled="!isFormsValid.organization"
                icon="pi pi-arrow-right"
                icon-pos="right"
                @click="nextCallback"
              />
            </div>
          </template>
        </StepperPanel>

        <StepperPanel
          :header="t('shared.details', { label: t('shared.admin') })"
        >
          <template #content="{ prevCallback }">
            <AdminForm />
            <div class="flex pt-4 justify-between">
              <Button
                :label="t('shared.next')"
                icon="pi pi-arrow-right"
                :disabled="!isFormsValid.admin"
                icon-pos="right"
                @click="confirmProps.showDialog"
              />
              <Button
                :label="t('shared.back')"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="prevCallback"
              />
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </div>
  </div>
</template>
