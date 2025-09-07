<template>
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div class="bg-white dark:bg-gray-900 rounded-lg w-2/3 max-w-xl p-6 relative">
            <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-700 dark:text-gray-300">&times;</button>
            <h2 class="text-xl font-bold mb-4">Beneficiary Review</h2>

            <div class="space-y-2">
                <div><span class="font-semibold">Name:</span> {{ account.name }}</div>
                <div><span class="font-semibold">IBAN:</span> {{ account.iban }}</div>
                <div><span class="font-semibold">Status:</span> {{ account.status }}</div>
            </div>

            <div class="mt-4 flex justify-end gap-2">
                <button @click="$emit('close')" class="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({ account: Object })
</script>
