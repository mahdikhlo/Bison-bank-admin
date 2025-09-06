<template>
    <div
        :class="[
      'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]',
      props.className,
    ]"
    >
        <!-- Card Header -->
        <div class="px-6 py-5">
            <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
                {{ props.title }}
            </h3>
            <p v-if="desc" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ props.desc }}
            </p>
        </div>

        <!-- Card Body -->
        <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div class="space-y-5">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    }
})
</script>
