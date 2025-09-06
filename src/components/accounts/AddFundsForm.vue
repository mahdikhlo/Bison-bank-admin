<template>
    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow max-w-md">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Funds to User Account</h2>
        <form @submit.prevent="submit">
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-300 mb-1">User</label>
                <input v-model="form.user" type="text" class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Username or ID" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input v-model.number="form.amount" type="number" class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Amount" />
            </div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add Funds</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
    user: '',
    amount: 0
})

const submit = () => {
    console.log('Add funds', form)
    form.user = ''
    form.amount = 0
}
</script>
