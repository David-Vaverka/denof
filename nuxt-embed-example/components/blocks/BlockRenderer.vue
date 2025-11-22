<script setup lang="ts">
import { computed } from 'vue'

import HeroBlock from '~/components/blocks/HeroBlock.vue'
import ProductListBlock from '~/components/blocks/ProductListBlock.vue'

type Block = {
  type: string
  props?: Record<string, any>
}

const props = withDefaults(defineProps<{
  blocks?: Block[]
}>(), {
  blocks: () => []
})

const safeBlocks = computed(() =>
  (props.blocks || []).filter(
    (block): block is Block =>
      Boolean(block) && typeof (block as Block).type === 'string'
  )
)

function resolveBlock(type: string) {
  switch (type) {
    case 'hero':
      return HeroBlock
    case 'productList':
      return ProductListBlock
    default:
      return null
  }
}
</script>

<template>
  <div>
    <component
      v-for="(block, index) in safeBlocks"
      :key="index"
      :is="resolveBlock(block.type)"
      v-bind="block.props"
      v-if="resolveBlock(block.type)"
    />
  </div>
</template>
