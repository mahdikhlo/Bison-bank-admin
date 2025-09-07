<template>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        <h2 class="text-lg font-bold dark:text-white mb-4">Role Templates</h2>

        <!-- Add new template -->
        <div class="flex gap-2 mb-4">
            <input v-model="newTemplateName" placeholder="New Role Template" class="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"/>
            <button @click="addTemplate" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
        </div>

        <!-- Templates list -->
        <ul class="space-y-2">
            <li v-for="(template, index) in templates" :key="index" class="flex justify-between items-center p-2 border rounded dark:border-gray-700">
                <span class="dark:text-white">{{ template.name }}</span>
                <div class="flex gap-2">
                    <button @click="editTemplate(index)" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">Edit</button>
                    <button @click="deleteTemplate(index)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const newTemplateName = ref('')
const templates = reactive([
    { name: 'Support' },
    { name: 'Finance' },
    { name: 'Compliance' }
])

const addTemplate = () => {
    if(newTemplateName.value.trim()){
        templates.push({ name: newTemplateName.value.trim() })
        newTemplateName.value = ''
    }
}

const editTemplate = (index) => {
    const name = prompt('Edit template name', templates[index].name)
    if(name) templates[index].name = name
}

const deleteTemplate = (index) => {
    if(confirm('Are you sure to delete this template?')) templates.splice(index,1)
}
</script>
