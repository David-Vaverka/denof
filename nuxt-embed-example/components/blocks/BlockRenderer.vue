<script setup lang="ts">
import HeroBlock from '~/components/blocks/HeroBlock.vue'
import ProductListBlock from '~/components/blocks/ProductListBlock.vue'

type Block = {
  type: string
  props?: Record<string, any>
}

const props = defineProps<{
  blocks: Block[]
}>()

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
      v-for="(block, index) in blocks"
      :key="index"
      :is="resolveBlock(block.type)"
      v-bind="block.props"
      v-if="resolveBlock(block.type)"
    />
  </div>
</template>
