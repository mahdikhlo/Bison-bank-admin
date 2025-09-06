<template>
    <div class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 !mt-0 top-0">
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Reset Password / 2FA</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <input
                        v-model="password"
                        type="password"
                        required
                        class="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                </div>

                <div class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        v-model="reset2FA"
                        id="reset2FA"
                        class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-2 focus:ring-brand-500"
                    />
                    <label for="reset2FA" class="text-sm text-gray-700 dark:text-gray-300">Reset 2FA</label>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end space-x-2 pt-4">
                    <button type="button" @click="$emit('close')" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
    user: Object
})

const emit = defineEmits(['close', 'reset'])

const password = ref('')
const reset2FA = ref(false)

const submitForm = () => {
    emit('reset', { userId: props.user.id, password: password.value, reset2FA: reset2FA.value })
    emit('close')
}
</script>
