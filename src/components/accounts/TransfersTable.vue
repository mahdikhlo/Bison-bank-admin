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
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Method</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="tx in paginatedData" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.id }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.user }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.amount }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.method }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ tx.status }}</td>
                    <td class="px-4 py-2 text-sm space-x-2">
                        <button @click="approve(tx.id)" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs">Approve</button>
                        <button @click="reject(tx.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Reject</button>
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

const transfers = reactive([
    { id: 1, user: 'John Doe', amount: 1000, method: 'SEPA', status: 'Pending' },
    { id: 2, user: 'Jane Smith', amount: 2000, method: 'SWIFT', status: 'Approved' },
    { id: 3, user: 'Alice', amount: 1500, method: 'SEPA', status: 'Rejected' },
    { id: 4, user: 'Bob', amount: 2500, method: 'SWIFT', status: 'Pending' }
])

const search = ref('')
const filterType = ref('')
const filterDate = ref({ from: '', to: '' })

const perPage = 2
const currentPage = ref(1)

const filteredData = computed(() => {
    return transfers.filter(tx => {
        const matchesSearch = tx.user.toLowerCase().includes(search.value.toLowerCase())
        const matchesType = filterType.value ? tx.method === filterType.value : true
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

const approve = (id) => { console.log('Approved', id) }
const reject = (id) => { console.log('Rejected', id) }
</script>
