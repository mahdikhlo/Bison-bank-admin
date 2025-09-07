<template>
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div class="bg-white dark:bg-gray-900 rounded-lg w-3/4 max-w-2xl p-6 relative">
            <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-700 dark:text-gray-300">&times;</button>
            <h2 class="text-xl font-bold mb-4">{{ ticket.subject }}</h2>

            <!-- Conversation -->
            <div class="max-h-64 overflow-y-auto mb-4 space-y-2">
                <div v-for="(msg, index) in ticket.messages" :key="index" class="p-2 rounded border dark:border-gray-700">
                    <span class="font-semibold">{{ msg.from }}:</span>
                    <span>{{ msg.text }}</span>
                    <div class="text-xs text-gray-500">{{ msg.date }}</div>
                </div>
            </div>

            <!-- Audit Log -->
            <div class="max-h-40 overflow-y-auto mb-4 border-t pt-2">
                <h3 class="font-semibold text-sm mb-2">Audit Log</h3>
                <div v-if="ticket.auditLog.length === 0" class="text-xs text-gray-500">No activity yet.</div>
                <div v-for="(log, i) in ticket.auditLog" :key="i" class="text-xs text-gray-600 dark:text-gray-400 border-b py-1">
                    <span class="font-semibold">{{ log.by }}</span> - {{ log.action }}
                    <span v-if="log.details"> ({{ log.details }})</span>
                    <div class="text-[10px] text-gray-400">{{ log.date }}</div>
                </div>
            </div>

            <!-- Reply -->
            <div class="flex flex-col gap-2">
                <textarea v-model="replyText" class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="Write a reply..."></textarea>
                <button @click="sendReply" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-32 self-end">Send Reply</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({ ticket: Object })
const emit = defineEmits(['close','reply'])
const replyText = ref('')
import SecurityManager from '@/services/SecurityManager.js'

const sendReply = () => {
    if(replyText.value.trim()){
        const message = { from: 'Admin', text: replyText.value, date: new Date().toLocaleString() }

        // لاگ حرفه‌ای
        SecurityManager.logAction(`Reply to ticket #${props.ticket.id}: ${message.text}`)

        emit('reply',{ ticket: props.ticket, message })
        replyText.value = ''
    }
}

</script>
