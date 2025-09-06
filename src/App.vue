<template>
  <ThemeProvider>
    <SidebarProvider>
      <router-view />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup>
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
</script>
