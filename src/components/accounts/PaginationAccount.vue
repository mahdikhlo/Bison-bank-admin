<template>
    <div class="flex justify-center space-x-2 mt-4">
        <button
            @click="prevPage"
            :disabled="currentPage <= 1"
            class="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
            Prev
        </button>

        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
            class="px-3 py-1 rounded border"
        >
            {{ page }}
        </button>

        <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
            Next
        </button>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
    total: { type: Number, required: true },
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 }
})

const emit = defineEmits(['update:currentPage'])


const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const changePage = (page) => {
    emit('update:currentPage', page)
}
const prevPage = () => { if (props.currentPage > 1) emit('update:currentPage', props.currentPage - 1) }
const nextPage = () => { if (props.currentPage < totalPages.value) emit('update:currentPage', props.currentPage + 1) }
</script>
