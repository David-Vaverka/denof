<script setup lang="ts">
import LayoutBase from '~/components/layout/LayoutBase.vue'
import BlockRenderer from '~/components/blocks/BlockRenderer.vue'

const props = withDefaults(defineProps<{
  menu?: Array<{ label: string; url: string }>
  user?: { name?: string | null }
  blocks?: Array<{
    type: string
    props?: Record<string, any>
  }>
}>(), {
  blocks: () => []
})
</script>

<template>
  <LayoutBase :menu="menu" :user="user">
    <BlockRenderer :blocks="blocks" />
  </LayoutBase>
</template>
