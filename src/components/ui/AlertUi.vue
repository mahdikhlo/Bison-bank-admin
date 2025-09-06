<template>
    <div :class="['rounded-xl border p-4', variantClasses[props.variant].container]">
        <div class="flex items-start gap-3">
            <div :class="['-mt-0.5', variantClasses[props.variant].icon]">
                <component :is="icons[props.variant]" />
            </div>

            <div>
                <h4 class="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                    {{ props.title }}
                </h4>

                <p class="text-sm text-gray-500 dark:text-gray-400">{{ props.message }}</p>

                <router-link
                    v-if="props.showLink"
                    :to="props.linkHref"
                    class="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400"
                >
                    {{ props.linkText }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { SuccessIcon, ErrorIcon, WarningIcon, InfoCircleIcon } from '@/icons'

const props = defineProps({
    variant: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    showLink: {
        type: Boolean,
        default: false
    },
    linkHref: {
        type: String,
        default: '#'
    },
    linkText: {
        type: String,
        default: 'Learn more'
    }
})

const variantClasses = {
    success: {
        container: 'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
        icon: 'text-success-500',
    },
    error: {
        container: 'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
        icon: 'text-error-500',
    },
    warning: {
        container: 'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
        icon: 'text-warning-500',
    },
    info: {
        container: 'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15',
        icon: 'text-blue-light-500',
    },
}

const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoCircleIcon,
}
</script>
