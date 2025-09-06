<template>
    <div class="fixed h-full inset-0 z-100 flex items-center justify-center bg-black/50 !mt-0 top-0">
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                    {{ user ? 'Edit User' : 'Create New User' }}
                </h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        v-model="form.name"
                        type="text"
                        required
                        class="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        v-model="form.email"
                        type="email"
                        required
                        class="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        v-model="form.password"
                        :placeholder="user ? 'Leave blank to keep current password' : ''"
                        type="password"
                        class="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        :required="!user"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Access Level</label>
                    <select
                        v-model="form.accessLevel"
                        class="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    >
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end space-x-2 pt-4">
                    <button type="button" @click="$emit('close')" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600">
                        {{ user ? 'Save Changes' : 'Create User' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    user: Object
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
    name: '',
    email: '',
    password: '',
    accessLevel: 'User'
})

// اگر مدال برای ویرایش باز شده، فرم رو پر می‌کنیم
watch(
    () => props.user,
    (val) => {
        if (val) {
            form.name = val.name
            form.email = val.email
            form.accessLevel = val.accessLevel
            form.password = ''
        } else {
            form.name = ''
            form.email = ''
            form.accessLevel = 'User'
            form.password = ''
        }
    },
    { immediate: true }
)

const submitForm = () => {
    emit('save', { ...form, id: props.user?.id })
    emit('close')
}
</script>
