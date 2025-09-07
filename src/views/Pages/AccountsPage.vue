<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />
        <div class="p-6 space-y-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Account & Transaction Management</h1>

            <!-- Tabs -->
            <div class="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 dark:text-gray-300'"
                    class="px-4 py-2 font-medium"
                >
                    {{ tab.name }}
                </button>
            </div>

            <!-- Tab Contents -->
            <div>
                <TransactionsTable v-if="activeTab === 'transactions'" />
                <AddFundsForm v-if="activeTab === 'addFunds'" />
                <TransfersTable v-if="activeTab === 'transfers'" />
                <TransferDocuments v-if="activeTab === 'documents'" />
            </div>
        </div>

    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import TransactionsTable from '@/components/accounts/TransactionsTable.vue'
import AddFundsForm from '@/components/accounts/AddFundsForm.vue'
import TransfersTable from '@/components/accounts/TransfersTable.vue'
import TransferDocuments from '@/components/accounts/TransferDocuments.vue'

const currentPageTitle = ref("Account & Transaction Management");


const tabs = [
    { id: 'transactions', name: 'Transactions' },
    { id: 'addFunds', name: 'Add Funds' },
    { id: 'transfers', name: 'Transfers' },
    { id: 'documents', name: 'Transfer Documents' }
]

const activeTab = ref('transactions')
</script>
