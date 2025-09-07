<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="space-y-4">
            <!-- Search -->
            <div class="flex items-center gap-4">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search by user or subject..."
                    class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
                />
                <select v-model="statusFilter" class="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            <!-- Tickets Table -->
            <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ID</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">User</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Subject</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="ticket in paginatedTickets" :key="ticket.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ ticket.id }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ ticket.user }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ ticket.subject }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ ticket.status }}</td>
                        <td class="px-4 py-2 text-sm space-x-2">
                            <button
                                @click="viewTicket(ticket)"
                                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            >
                                View
                            </button>
                            <button
                                @click="toggleStatus(ticket)"
                                :class="ticket.status === 'Open' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                                class="px-2 py-1 text-white rounded text-xs"
                            >
                                {{ ticket.status === 'Open' ? 'Close' : 'Reopen' }}
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <Pagination
                :total="filteredTickets.length"
                :per-page="perPage"
                v-model:currentPage="currentPage"
            />

            <!-- Ticket Modal -->
            <TicketModal
                v-if="selectedTicket"
                :ticket="selectedTicket"
                @close="selectedTicket = null"
                @reply="handleReply"
            />
        </div>

    </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Pagination from '@/components/common/CommonPagination.vue';
import TicketModal from '@/components/support/TicketModal.vue';
import SecurityManager from '@/services/SecurityManager.js'

const currentPageTitle = ref("Support & Tickets");

const tickets = reactive([
    {
        id: 1,
        user: 'John Doe',
        subject: 'Login Issue',
        status: 'Open',
        messages: [{from:'User', text:'Cannot login', date:'2025-09-06'}],
        auditLog: []
    },
    {
        id: 2,
        user: 'Jane Smith',
        subject: 'Payment Problem',
        status: 'Closed',
        messages: [{from:'User', text:'Payment failed', date:'2025-09-05'}],
        auditLog: []
    },
    {
        id: 3,
        user: 'Alice',
        subject: 'Account Update',
        status: 'Open',
        messages: [{from:'User', text:'Need to update email', date:'2025-09-04'}],
        auditLog: []
    }
])

const search = ref('')
const statusFilter = ref('')
const perPage = 2
const currentPage = ref(1)
const selectedTicket = ref(null)

const filteredTickets = computed(() => {
    return tickets.filter(t =>
        (t.user.toLowerCase().includes(search.value.toLowerCase()) || t.subject.toLowerCase().includes(search.value.toLowerCase())) &&
        (statusFilter.value ? t.status === statusFilter.value : true)
    )
})

const paginatedTickets = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredTickets.value.slice(start, start + perPage)
})

const viewTicket = (ticket) => { selectedTicket.value = ticket }
// const toggleStatus = (ticket) => { ticket.status = ticket.status === 'Open' ? 'Closed' : 'Open' }
// const handleReply = ({ticket, message}) => { ticket.messages.push(message) }

const toggleStatus = (ticket) => {
    if(!SecurityManager.hasAccess(['Admin', 'Support'])) return alert('Access denied')
    SecurityManager.createSensitiveAction(`Change ticket #${ticket.id} status from ${ticket.status}`)
    ticket.status = ticket.status === 'Open' ? 'Closed' : 'Open'
}


const handleReply = ({ticket, message}) => {
    ticket.messages.push(message)
    ticket.auditLog.push({
        action: 'Reply sent',
        by: message.from,
        details: message.text,
        date: message.date
    })
}
</script>
