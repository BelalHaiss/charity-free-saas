<script setup lang="ts">
import langMenu from '@render/components/atoms/lang-menu.vue';
import ConfirmDialog from '@render/components/organisms/confirm-dialog.vue';
import { useInitialSetup } from '@render/modules/initial-setup/ViewModel/use-initial-setup-vm';
import InitialMessage from '@render/modules/initial-setup/components/atoms/initial-message.vue';
import AdminForm from '@render/modules/initial-setup/components/organism/admin-form.vue';
import OrganizationTemplate from '@render/modules/initial-setup/components/template/organization-template.vue';
const { confirmProps, isFormsValid } = useInitialSetup();
</script>
<template>
  <div class="p-4 flex flex-col mx-container relative">
    <ConfirmDialog v-bind="confirmProps" />
    <div class="flex-center gap-2">
      <langMenu />

      <InitialMessage class="flex-1 mt-4 max-w-[600px]" />
    </div>
    <div class="flex-1 w-full flex justify-content-center">
      <Stepper linear class="w-full">
        <StepperPanel
          :header="$t('shared.details', { label: $t(`shared.organization`) })"
        >
          <template #content="{ nextCallback }">
            <OrganizationTemplate />
            <div class="flex pt-4 justify-content-end">
              <Button
                :label="$t('shared.next')"
                :disabled="!isFormsValid.organization"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="nextCallback"
              />
            </div>
          </template>
        </StepperPanel>

        <StepperPanel
          :header="$t('shared.details', { label: $t('shared.admin') })"
        >
          <template #content="{ prevCallback, nextCallback }">
            <AdminForm />
            <div class="flex pt-4 justify-between">
              <Button
                :label="$t('shared.next')"
                icon="pi pi-arrow-right"
                :disabled="!isFormsValid.admin"
                iconPos="right"
                @click="confirmProps.showDialog"
              />
              <Button
                :label="$t('shared.back')"
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
