<template>
  <Message
    :pt="{
      text: {
        class: 'flex-1 flex-col flex-center'
      }
    }"
    :closable="false"
    class="w-full max-w-[700px] mx-auto"
    ><h5 class="font-bold text-xl">{{ $t('shared.assalam') }} &#128075;</h5>
    <p class="font-normal text-sm">
      {{ $t('organization.enter-organization-details') }}
    </p>
  </Message>
</template>

<script setup lang="ts"></script>
