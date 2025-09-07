<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="space-y-6">
            <!-- Filters -->
            <div class="flex items-center gap-4">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search by user or action..."
                    class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
                />
                <select v-model="typeFilter" class="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
                    <option value="">All Types</option>
                    <option value="login">Login</option>
                    <option value="transaction">Transaction</option>
                    <option value="change">Change</option>
                    <option value="failed_login">Failed Login</option>
                </select>
            </div>

            <!-- Alerts -->
            <div v-if="alerts.length" class="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
                <h3 class="font-semibold mb-2">⚠ Suspicious Activity Alerts</h3>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li v-for="(alert, index) in alerts" :key="index">{{ alert }}</li>
                </ul>
            </div>

            <!-- Logs Table -->
            <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">User</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Action</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Details</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">IP</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="(log, index) in paginatedLogs" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.user }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.action }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.details }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.ip }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.date }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <Pagination
                :total="filteredLogs.length"
                :per-page="perPage"
                v-model:currentPage="currentPage"
            />
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from "vue"
import AdminLayout from "@/components/layout/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import Pagination from "@/components/common/CommonPagination.vue"

const currentPageTitle = ref("Security & Logs")

// Sample Logs
const logs = reactive([
    { user: "Alice", action: "login", details: "Successful login", ip: "192.168.1.10", date: "2025-09-06 14:12" },
    { user: "Alice", action: "transaction", details: "Sent 500 EUR to Bob", ip: "192.168.1.10", date: "2025-09-06 14:15" },
    { user: "Bob", action: "failed_login", details: "Wrong password", ip: "192.168.1.11", date: "2025-09-06 14:20" },
    { user: "Bob", action: "failed_login", details: "Wrong password", ip: "192.168.1.11", date: "2025-09-06 14:22" },
    { user: "Bob", action: "failed_login", details: "Wrong password", ip: "192.168.1.11", date: "2025-09-06 14:25" },
    { user: "Charlie", action: "change", details: "Changed password", ip: "192.168.1.12", date: "2025-09-06 15:00" }
])

const search = ref("")
const typeFilter = ref("")
const perPage = 5
const currentPage = ref(1)

// Filters
const filteredLogs = computed(() => {
    return logs.filter(
        log =>
            (log.user.toLowerCase().includes(search.value.toLowerCase()) ||
                log.details.toLowerCase().includes(search.value.toLowerCase())) &&
            (typeFilter.value ? log.action === typeFilter.value : true)
    )
})

// Pagination
const paginatedLogs = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredLogs.value.slice(start, start + perPage)
})

// Alerts for suspicious activity
const alerts = computed(() => {
    const alertsList = []
    // Rule 1: Multiple failed logins (>=3)
    const failedLogins = logs.filter(log => log.action === "failed_login")
    const userFailedCounts = {}
    failedLogins.forEach(log => {
        userFailedCounts[log.user] = (userFailedCounts[log.user] || 0) + 1
    })
    for (const [user, count] of Object.entries(userFailedCounts)) {
        if (count >= 3) {
            alertsList.push(`${user} had ${count} failed login attempts.`)
        }
    }

    // Rule 2: Unusual transfers (example: > 10000 EUR)
    logs.forEach(log => {
        if (log.action === "transaction" && log.details.includes("EUR")) {
            const match = log.details.match(/(\d+)\s*EUR/)
            if (match && parseInt(match[1]) > 10000) {
                alertsList.push(`${log.user} made a large transfer of ${match[0]}.`)
            }
        }
    })

    return alertsList
})


</script>

