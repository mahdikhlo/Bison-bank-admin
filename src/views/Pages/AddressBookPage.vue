<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="space-y-4">
            <!-- Search -->
            <div class="flex items-center gap-4">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search beneficiary by name or IBAN..."
                    class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
                />
                <select v-model="statusFilter" class="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                </select>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ID</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Beneficiary</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">IBAN</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="item in paginatedList" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ item.id }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ item.name }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ item.iban }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ item.status }}</td>
                        <td class="px-4 py-2 text-sm space-x-2">
                            <button
                                @click="toggleStatus(item); blockBeneficiary(item)"
                                :class="item.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                                class="px-2 py-1 text-white rounded text-xs"
                            >
                                {{ item.status === 'Active' ? 'Block' : 'Unblock' }}
                            </button>
                            <button
                                @click="reviewAccount(item)"
                                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            >
                                Review
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <Pagination
                :total="filteredList.length"
                :per-page="perPage"
                v-model:currentPage="currentPage"
            />

            <!-- Modal -->
            <BeneficiaryModal
                v-if="selectedAccount"
                :account="selectedAccount"
                @close="selectedAccount = null"
            />

            <!-- Audit Log -->
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                <h3 class="text-lg font-semibold mb-2">Audit Log</h3>
                <ul class="space-y-1 max-h-60 overflow-y-auto text-sm">
                    <li v-for="(log, index) in auditLog" :key="index" class="text-gray-600 dark:text-gray-300">
                        <span class="font-semibold">{{ log.user }}</span> — {{ log.action }}
                        <span class="italic">({{ log.name }} - {{ log.iban }})</span>
                        <div class="text-xs text-gray-400">{{ log.date }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from "vue"
import AdminLayout from "@/components/layout/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import Pagination from "@/components/common/CommonPagination.vue"
import BeneficiaryModal from "@/components/addressbook/BeneficiaryModal.vue"
import SecurityManager from '@/services/SecurityManager.js'

const currentPageTitle = ref("User Address Book")

const beneficiaries = reactive([
    { id: 1, name: "Alice", iban: "DE1234567890", status: "Active" },
    { id: 2, name: "Bob", iban: "FR0987654321", status: "Blocked" },
    { id: 3, name: "Charlie", iban: "GB123443211234", status: "Active" }
])

const search = ref("")
const statusFilter = ref("")
const perPage = 5
const currentPage = ref(1)
const selectedAccount = ref(null)

const auditLog = ref([]) // لیست تغییرات و تعاملات

const filteredList = computed(() => {
    return beneficiaries.filter(item =>
        (item.name.toLowerCase().includes(search.value.toLowerCase()) ||
            item.iban.toLowerCase().includes(search.value.toLowerCase())) &&
        (statusFilter.value ? item.status === statusFilter.value : true)
    )
})

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredList.value.slice(start, start + perPage)
})

const toggleStatus = (item) => {
    const oldStatus = item.status
    item.status = item.status === "Active" ? "Blocked" : "Active"
    auditLog.value.unshift({
        user: "Admin",
        action: `Changed status from ${oldStatus} to ${item.status}`,
        name: item.name,
        iban: item.iban,
        date: new Date().toLocaleString()
    })
}

const reviewAccount = (item) => {
    selectedAccount.value = item
    auditLog.value.unshift({
        user: "Admin",
        action: "Reviewed beneficiary account",
        name: item.name,
        iban: item.iban,
        date: new Date().toLocaleString()
    })
}

const blockBeneficiary = (account) => {
    if(!SecurityManager.hasAccess(['Admin', 'Finance'])) return alert('Access denied')
    SecurityManager.createSensitiveAction(`Block beneficiary ${account.name}`)
    // مدیر دوم باید تایید کند
    // console.log(account)
}

</script>
