<script setup lang="ts">
import { computed } from 'vue'

import LayoutBase from '~/components/layout/LayoutBase.vue'
import BlockRenderer from '~/components/blocks/BlockRenderer.vue'

const props = defineProps<{
  menu?: Array<{ label: string; url: string }>
  user?: { name?: string | null }
  blocks?: unknown
}>()

const safeBlocks = computed(() => (Array.isArray(props.blocks) ? props.blocks : []))
</script>

<template>
  <LayoutBase :menu="menu" :user="user">
    <BlockRenderer :blocks="safeBlocks" />
  </LayoutBase>
</template>
