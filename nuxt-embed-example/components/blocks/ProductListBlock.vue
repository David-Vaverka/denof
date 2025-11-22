<script setup lang="ts">
const props = defineProps<{
  title?: string
  items: Array<{ name: string; price: number }>
}>()
</script>

<template>
  <section class="products">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <ul class="list">
      <li v-for="item in items" :key="item.name" class="item">
        <span>{{ item.name }}</span>
        <span class="price">{{ item.price }} Kč</span>
      </li>
    </ul>
  </section>
</template>
