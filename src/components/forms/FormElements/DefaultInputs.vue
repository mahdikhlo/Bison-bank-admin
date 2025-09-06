<template>
    <div class="space-y-6">
        <!-- Text Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Input
            </label>
            <input
                type="text"
                v-model="formData.input"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
        </div>

        <!-- Input with Placeholder -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Input with Placeholder
            </label>
            <input
                type="text"
                v-model="formData.inputWithPlaceholder"
                placeholder="info@gmail.com"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
        </div>

        <!-- Select Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Select Input
            </label>
            <div class="relative z-20 bg-transparent">
                <select
                    v-model="formData.selectInput"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    :class="{ 'text-gray-800 dark:text-white/90': formData.selectInput }"
                >
                    <option value="" disabled selected>Select Option</option>
                    <option value="marketing">Marketing</option>
                    <option value="template">Template</option>
                    <option value="development">Development</option>
                </select>
                <span
                    class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
                >
          <svg
              class="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke=""
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </span>
            </div>
        </div>

        <!-- Password Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Password Input
            </label>
            <div class="relative">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="formData.password"
                    placeholder="Enter your password"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
                <span
                    @click="showPassword = !showPassword"
                    class="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
          <!-- SVG icons here -->
        </span>
            </div>
        </div>

        <!-- Date Picker Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Date Picker Input
            </label>
            <div class="relative">
                <flat-pickr
                    v-model="date"
                    :config="flatpickrConfig"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    placeholder="Select date"
                />
            </div>
        </div>

        <!-- Time Select Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Time Select Input
            </label>
            <div class="relative">
                <flat-pickr
                    v-model="time"
                    :config="flatpickrTimeConfig"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    placeholder="Select time"
                />
            </div>
        </div>

        <!-- Input with Payment -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Input with Payment
            </label>
            <div class="relative">
                <input
                    type="text"
                    v-model="formData.cardNumber"
                    placeholder="Card number"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-[62px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

const showPassword = ref(false)

const formData = reactive({
    input: '',
    inputWithPlaceholder: '',
    selectInput: '',
    password: '',
    date: '',
    time: '',
    cardNumber: '',
})

const date = ref(null)
const time = ref(null)

const flatpickrConfig = {
    dateFormat: 'Y-m-d',
    altInput: true,
    altFormat: 'F j, Y',
    wrap: true,
}

const flatpickrTimeConfig = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: false,
    minuteIncrement: 1,
    wrap: false,
}
</script>
