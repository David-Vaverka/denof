<script setup lang="ts">
import PageBridge from '~/components/bridge/PageBridge.vue'

const { data: payload } = await useAsyncData('page-home', () =>
  $fetch('/api/page-home')
)
</script>

<template>
  <PageBridge
    v-if="payload"
    :menu="payload.menu"
    :user="payload.user"
    :blocks="payload.blocks"
  />
  <div v-else>Loading...</div>
</template>
