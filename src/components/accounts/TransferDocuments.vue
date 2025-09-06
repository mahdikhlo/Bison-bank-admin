<template>
    <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 px-4 py-2">Attached Documents</h2>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
                <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Transfer ID</th>
                <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">File Name</th>
                <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded By</th>
                <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="doc in documents" :key="doc.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ doc.transferId }}</td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ doc.name }}</td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ doc.uploadedBy }}</td>
                <td class="px-4 py-2 text-sm space-x-2">
                    <button @click="viewDocument(doc)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">View</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const documents = reactive([
    { id: 1, transferId: 1, name: 'invoice.pdf', uploadedBy: 'John Doe' },
    { id: 2, transferId: 2, name: 'receipt.jpg', uploadedBy: 'Jane Smith' }
])

const viewDocument = (doc) => {
    console.log('View document', doc)
}
</script>
