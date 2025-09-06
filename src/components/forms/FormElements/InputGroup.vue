<template>
    <div class="space-y-6">
        <!-- Email Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
            </label>
            <div class="relative">
        <span
            class="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400"
        >
          <!-- SVG Icon -->
        </span>
                <input
                    v-model="email"
                    type="text"
                    placeholder="info@gmail.com"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pl-[62px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>

        <!-- Phone Input with Prepended Country Code -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Phone
            </label>
            <div class="relative">
                <div class="absolute">
                    <select
                        v-model="selectedCountry"
                        @change="updatePhoneNumber"
                        class="appearance-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent bg-none py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
                    >
                        <option v-for="(code, country) in countryCodes" :key="country" :value="country">
                            {{ country }}
                        </option>
                    </select>
                </div>
                <input
                    v-model="phoneNumber"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-[84px] pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>

        <!-- Phone Input with Appended Country Code -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Phone
            </label>
            <div class="relative">
                <div class="absolute right-0">
                    <select
                        v-model="selectedCountry2"
                        @change="updatePhoneNumber2"
                        class="appearance-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent bg-none py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
                    >
                        <option v-for="(code, country) in countryCodes" :key="country" :value="country">
                            {{ country }}
                        </option>
                    </select>
                </div>
                <input
                    v-model="phoneNumber2"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    class="dark:bg-dark-900 h-11 w-full p-3 rounded-lg border border-gray-300 bg-transparent py-3 pr-[84px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>

        <!-- URL Input -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"> URL </label>
            <div class="relative">
        <span
            class="absolute left-0 top-1/2 inline-flex h-11 -translate-y-1/2 items-center justify-center border-r border-gray-200 py-3 pl-3.5 pr-3 text-gray-500 dark:border-gray-800 dark:text-gray-400"
        >
          http://
        </span>
                <input
                    v-model="url"
                    type="url"
                    placeholder="www.tailadmin.com"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pl-[90px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>

        <!-- Website Input with Copy Button -->
        <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Website
            </label>
            <div class="relative">
                <button
                    @click="copyWebsite"
                    class="absolute right-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 border-l border-gray-200 py-3 pl-3.5 pr-3 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-400"
                >
                    <svg
                        class="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <!-- SVG Path -->
                    </svg>
                    <div>{{ copyText }}</div>
                </button>
                <input
                    v-model="website"
                    type="url"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-4 pr-[90px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const selectedCountry = ref('US')
const selectedCountry2 = ref('US')
const phoneNumber = ref('')
const phoneNumber2 = ref('')
const url = ref('')
const website = ref('www.tailadmin.com')
const copyText = ref('Copy')

const countryCodes = {
    US: '+1',
    GB: '+44',
    CA: '+1',
    AU: '+61',
}

const updatePhoneNumber = () => {
    phoneNumber.value = countryCodes[selectedCountry.value]
}

const updatePhoneNumber2 = () => {
    phoneNumber2.value = countryCodes[selectedCountry2.value]
}

const copyWebsite = () => {
    navigator.clipboard.writeText(website.value)
    copyText.value = 'Copied!'
    setTimeout(() => {
        copyText.value = 'Copy'
    }, 2000)
}
</script>
