import { Ref, ref, watch } from 'vue';
import { initialSetupSchema } from '@shared/services/schema/setup.schema';
import {
  InitialSetupClient,
  InitialSetupToClient
} from '@shared/types/setup/initial.dto';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAxiosFetch } from '@render/composables/use-axios-fetch';
import { useConfirm } from '@render/composables/use-confirm';
import { useToast } from '@render/composables/use-toast';
import { useGlobalState } from '@render/composables/use-global-state';
import { sleep } from '@render/utils/dev.util';

export const useInitialSetup = () => {
  const { values, errors, isFieldDirty, isFieldValid } =
    useForm<InitialSetupClient>({
      initialValues: {
        adminUser: {
          branches: [1]
        },
        branch: {
          scheduled_visits: false
        }
      },
      validationSchema: toTypedSchema(initialSetupSchema)
    });

  const isFormsValid = ref({
    organization: false,
    admin: false
  });
  watch(errors, async () => {
    isFormsValid.value.organization =
      isFieldDirty('branch') &&
      isFieldDirty('branch') &&
      isFieldValid('organization') &&
      isFieldValid('branch');

    isFormsValid.value.admin =
      isFieldDirty('adminUser') && isFieldValid('adminUser');
  });

  // submiting data

  const { execute } = useAxiosFetch<InitialSetupToClient>('/setup/init', {
    method: 'POST',
    data: values
  });

  const { successToast, failedToast } = useToast();
  const { actions } = useGlobalState();
  const onConfirmSubmit = async (isSubmitting: Ref<boolean>) => {
    isSubmitting.value = true;
    try {
      await sleep(2000);
      successToast();
      return;
      // const result = await execute();
      // console.log({ result });
      // if (result && result.data.value) {
      //   successToast();
      //   actions.setOrganization(result.data.value.organization);
      //   actions.setUser(result.data.value.user);
      // }
    } catch (error) {
      console.log({ error }, 'failed errro');
      failedToast();
      return;
    } finally {
      isSubmitting.value = false;
    }
  };
  const confirmProps = useConfirm(onConfirmSubmit);

  return {
    confirmProps,
    isFormsValid
  };
};
