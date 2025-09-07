<template>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        <h2 class="text-lg font-bold dark:text-white mb-4">Ticket Macros</h2>

        <div class="flex gap-2 mb-4">
            <input v-model="newMacro" placeholder="New canned response" class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"/>
            <button @click="addMacro" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
        </div>

        <ul class="space-y-2">
            <li v-for="(macro, index) in macros" :key="index" class="flex justify-between items-center p-2 border rounded dark:border-gray-700">
                <span class="dark:text-white">{{ macro.text }}</span>
                <div class="flex gap-2">
                    <button @click="editMacro(index)" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">Edit</button>
                    <button @click="deleteMacro(index)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const newMacro = ref('')
const macros = reactive([
    { text: 'Hello, thank you for contacting support.' },
    { text: 'We are reviewing your request and will respond shortly.' }
])

const addMacro = () => {
    if(newMacro.value.trim()){
        macros.push({ text: newMacro.value.trim() })
        newMacro.value = ''
    }
}

const editMacro = (index) => {
    const text = prompt('Edit canned response', macros[index].text)
    if(text) macros[index].text = text
}

const deleteMacro = (index) => {
    if(confirm('Are you sure to delete this response?')) macros.splice(index,1)
}
</script>
