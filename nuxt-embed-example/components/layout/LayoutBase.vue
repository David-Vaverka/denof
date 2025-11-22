<script setup lang="ts">
const props = defineProps<{
  menu?: Array<{ label: string; url: string }>
  user?: { name?: string | null }
}>()
</script>

<template>
  <div class="page">
    <header class="header">
      <nav v-if="menu?.length" class="menu">
        <a
          v-for="item in menu"
          :key="item.url"
          :href="item.url"
          class="menu-item"
        >
          {{ item.label }}
        </a>
      </nav>
      <div v-if="user?.name" class="user">
        Přihlášený: {{ user.name }}
      </div>
    </header>

    <main class="content">
      <slot />
    </main>

    <footer class="footer">
      <small>© Example Nuxt Embed</small>
    </footer>
  </div>
</template>
