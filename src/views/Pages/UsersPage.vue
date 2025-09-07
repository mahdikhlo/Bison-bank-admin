<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="p-6 space-y-6 min-h-screen">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-gray-600 dark:text-white">User Management</h1>
                <button @click="openUserModal(); addUser({ name: 'Ali', email: 'ali@example.com' })" class="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">
                    Create New User
                </button>
            </div>

            <!-- Users Table -->
            <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Access Level</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ user.name }}</td>
                        <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ user.email }}</td>
                        <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ user.accessLevel }}</td>
                        <td class="px-4 py-3">
                    <span
                        :class="user.suspended === false ? 'text-green-600' : 'text-red-600'"
                        class="font-medium"
                    >
                      {{ user.suspended === false ? 'active' : 'suspended' }}
                    </span>
                        </td>
                        <td class="px-4 py-2 text-gray-700 dark:text-gray-300 space-x-2">
                            <button @click="openUserModal(user)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">Edit</button>
                            <button @click="openResetModal(user)" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">Reset</button>
                            <button @click="toggleSuspend(user); toggleUserStatus({ name: 'Ali', email: 'ali@example.com' })" :class="user.suspended ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'" class="px-2 py-1 text-white rounded text-xs">
                                {{ user.suspended ? 'Unsuspend' : 'Suspend' }}
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Login Logs -->
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-600 dark:text-white">Login Logs</h2>
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">User</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">IP</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="log in loginLogs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.user }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.ip }}</td>
                        <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{{ log.date }}</td>
                        <td class="px-4 py-2 text-sm" :class="log.status === 'Failed' ? 'text-red-500' : 'text-green-500'">{{ log.status }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modals -->
            <UserModal v-if="showUserModal" :user="selectedUser" @close="closeUserModal" @save="saveUser" />
            <ResetModal v-if="showResetModal" :user="selectedUser" @close="closeResetModal" @reset="resetUser" />
        </div>

    </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

import UserModal from '@/components/users/UserModal.vue'
import ResetModal from '@/components/users/ResetModal.vue'

import SecurityManager from '@/services/SecurityManager.js'

const currentPageTitle = ref("Users");

// کاربران فرضی
const users = reactive([
    { id: 1, name: 'John Doe', email: 'john@example.com', accessLevel: 'Admin', suspended: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', accessLevel: 'User', suspended: false }
])

const loginLogs = reactive([
    { id: 1, user: 'John Doe', ip: '192.168.1.10', date: '2025-09-06 08:23', status: 'Success' },
    { id: 2, user: 'Jane Smith', ip: '192.168.1.12', date: '2025-09-06 09:15', status: 'Failed' },
    { id: 3, user: 'John Doe', ip: '192.168.1.10', date: '2025-09-05 18:40', status: 'Success' }
])

// مدال‌ها
const showUserModal = ref(false)
const showResetModal = ref(false)
const selectedUser = ref(null)

const openUserModal = (user = null) => {
    selectedUser.value = user
    showUserModal.value = true
}
const closeUserModal = () => {
    showUserModal.value = false
    selectedUser.value = null
}

const openResetModal = (user) => {
    selectedUser.value = user
    showResetModal.value = true
}
const closeResetModal = () => {
    showResetModal.value = false
    selectedUser.value = null
}

// عملکردها
const saveUser = (userData) => {
    if (userData.id) {
        const index = users.findIndex(u => u.id === userData.id)
        if (index !== -1) users[index] = { ...users[index], ...userData }
    } else {
        users.push({ ...userData, id: Date.now(), suspended: false })
    }
}

const resetUser = (data) => {
    console.log('Reset user', data)
    // اینجا می‌توان API برای ریست پسورد و 2FA صدا زد
}

const toggleSuspend = (user) => {
    user.suspended = !user.suspended
}

// اضافه کردن کاربر جدید
const addUser = (user) => {
    if(!SecurityManager.hasAccess(['Admin', 'Compliance'])) return alert('Access denied');
    const action = ref();
    action.value = SecurityManager.createSensitiveAction(`Add user ${user.name}`)
    // این اقدام باید توسط مدیر دیگر تایید شود
}

// تغییر وضعیت کاربر (فعال/غیرفعال)
const toggleUserStatus = (user) => {
    if(!SecurityManager.hasAccess(['Admin'])) return alert('Access denied')
    const action = ref();
    action.value = SecurityManager.createSensitiveAction(`Toggle status for user ${user.name}`)
    console.log("action", action);
    // بعداً مدیر دوم approve می‌کند
}

// لاگ ساده
SecurityManager.logAction(`Viewed user list`)


</script>
