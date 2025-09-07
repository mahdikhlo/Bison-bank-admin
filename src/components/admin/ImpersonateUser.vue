<template>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        <h2 class="text-lg font-bold dark:text-white mb-4">Impersonate User (Read-only)</h2>

        <div class="flex gap-2 mb-4">
            <input v-model="username" placeholder="Enter username" class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"/>
            <button @click="startImpersonate" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start</button>
            <button v-if="isImpersonating" @click="stopImpersonate" class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">Stop</button>
        </div>

        <div v-if="isImpersonating" class="text-sm text-gray-700 dark:text-gray-300">
            Currently impersonating: <strong>{{ username }}</strong>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const isImpersonating = ref(false)

const startImpersonate = () => {
    if(username.value.trim()){
        isImpersonating.value = true
        alert(`You are now impersonating ${username.value} (Read-only)`)
    }
}

const stopImpersonate = () => {
    isImpersonating.value = false
    username.value = ''
    alert('Stopped impersonating')
}
</script>
