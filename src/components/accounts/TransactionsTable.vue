<template>
    <div class="space-y-4">
        <!-- Search & Filter -->
        <SearchFilter
            v-model:search="search"
            v-model:filterType="filterType"
            v-model:filterDate="filterDate"
        />

        <!-- Table -->
        <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ID</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">User</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Amount</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="tx in paginatedData" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.id }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.user }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.amount }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.type }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.date }}</td>
                    <td class="px-4 py-2 text-sm space-x-2">
                        <button @click="editTransaction(tx)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">Edit</button>
                        <button @click="deleteTransaction(tx.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <Pagination
            :total="filteredData.length"
            :per-page="perPage"
            v-model:currentPage="currentPage"
        />
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Pagination from '../common/CommonPagination.vue'
import SearchFilter from './SearchFilter.vue'

const transactions = reactive([
    { id: 1, user: 'John Doe', amount: 100, type: 'Credit', date: '2025-09-06 08:23' },
    { id: 2, user: 'Jane Smith', amount: 50, type: 'Debit', date: '2025-09-06 09:15' },
    { id: 3, user: 'Alice', amount: 200, type: 'Credit', date: '2025-09-05 14:10' },
    { id: 4, user: 'Bob', amount: 300, type: 'Debit', date: '2025-09-05 16:20' }
])

const search = ref('')
const filterType = ref('')
const filterDate = ref({ from: '', to: '' })

const perPage = 2
const currentPage = ref(1)

const filteredData = computed(() => {
    return transactions.filter(tx => {
        const matchesSearch = tx.user.toLowerCase().includes(search.value.toLowerCase())
        const matchesType = filterType.value ? tx.type === filterType.value : true
        const matchesDate = filterDate.value.from && filterDate.value.to
            ? tx.date >= filterDate.value.from && tx.date <= filterDate.value.to
            : true
        return matchesSearch && matchesType && matchesDate
    })
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredData.value.slice(start, start + perPage)
})

const editTransaction = (tx) => { console.log('Edit', tx) }
const deleteTransaction = (id) => {
    const index = transactions.findIndex(t => t.id === id)
    if (index !== -1) transactions.splice(index, 1)
}
</script>
