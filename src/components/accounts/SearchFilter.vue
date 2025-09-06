<template>
    <div class="flex flex-wrap gap-4 items-end justify-between">
        <!-- Search -->
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Search User</label>
            <input
                v-model="localSearch"
                type="text"
                placeholder="Type username..."
                class="mt-1 px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
            />
        </div>

        <div class="flex gap-4 items-end">
            <!-- Filter Type -->
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select
                    v-model="localFilterType"
                    class="mt-1 px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
                >
                    <option value="">All</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                </select>
            </div>

            <!-- Filter Date -->
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                <input v-model="localFilterDate.from" type="date" class="mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                <input v-model="localFilterDate.to" type="date" class="mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive, defineProps, defineEmits } from 'vue'

const props = defineProps({
    search: String,
    filterType: String,
    filterDate: Object
})

const emit = defineEmits(['update:search','update:filterType','update:filterDate'])

const localSearch = ref(props.search || '')
const localFilterType = ref(props.filterType || '')
const localFilterDate = reactive({
    from: props.filterDate?.from || '',
    to: props.filterDate?.to || ''
})

watch(localSearch, val => emit('update:search', val))
watch(localFilterType, val => emit('update:filterType', val))
watch(localFilterDate, val => emit('update:filterDate', val), { deep: true })
</script>
