<script lang="ts" setup>
import { loginSchema } from "@shared/services/schema/auth.schema";
import { LoginPayload } from "@shared/types/auth/auth.dto";
import { Locale } from "@shared/types/util.types";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { userRepository } from "../../repository/user.repository";
import { useGlobalState } from "@render/composables/use-global-state";
import FormControl from "@render/components/molecules/form/form-control.vue";
import { useToast } from "@render/composables/use-toast";
import { sleep } from "@render/utils/dev.util";
import { useRouter } from "vue-router/auto";
const { locale, t } = useI18n<object, Locale>();
const { handleSubmit, isSubmitting } = useForm<LoginPayload>({
  validationSchema: toTypedSchema(loginSchema(locale.value)),
});

const router = useRouter();

const { failedToast } = useToast();
const { actions } = useGlobalState();
const onSubmit = handleSubmit(async (payload) => {
  try {
    await sleep(2000);
    const userResponse = await userRepository.login(payload);
    actions.setUserToken(`Bearer ${userResponse.access_token}`);
    actions.setUser(userResponse.user);
    router.push("/");
  } catch (e) {
    failedToast(e);
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen min-w-[100vw]">
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 bg-white"
          style="border-radius: 53px"
        >
          <div class="text-center mb-8">
            <div
              class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
            >
              {{ t("shared.messages.welcome") }}
            </div>
            <span class="text-muted-color font-medium">
              {{ t("shared.messages.sign_in") }}
            </span>
          </div>

          <form class="flex flex-col gap-4" :onsubmit="onSubmit">
            <FormControl
              :label="t('shared.form.username')"
              name="username"
              :inputProps="{
                placeholder: t('shared.form.username'),
              }"
              type="text"
            />

            <FormControl
              :label="t('shared.form.password')"
              name="password"
              :inputProps="{
                placeholder: t('shared.form.password'),
              }"
              type="password"
            />

            <Button
              :loading="isSubmitting"
              type="submit"
              :label="t('shared.login')"
              class="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
