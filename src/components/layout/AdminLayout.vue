<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar :class="{ 'z-100': isMobileOpen}"/>
    <Backdrop class="z-50"/>
    <div
      class="flex-1 transition-all duration-300 ease-in-out z-100"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <app-header />
      <div class="p-4 mx-auto bg-white max-w-(--breakpoint-2xl) md:p-6 dark:bg-gray-900 z-50">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar'
import Backdrop from './BackdropLayout.vue'
const { isExpanded, isMobileOpen, isHovered } = useSidebar()
</script>
