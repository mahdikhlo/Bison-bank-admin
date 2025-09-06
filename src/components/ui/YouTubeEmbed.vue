<template>
    <div :class="['overflow-hidden rounded-lg', aspectRatioClass, className]">
        <iframe
            :src="`https://www.youtube.com/embed/${videoId}`"
            :title="title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
        ></iframe>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
    videoId: {
        type: String,
        required: true
    },
    aspectRatio: {
        type: String,
        default: '16:9'
    },
    title: {
        type: String,
        default: 'YouTube video'
    },
    className: {
        type: String,
        default: ''
    }
})

const aspectRatioClass = computed(() => {
    const aspectRatioClasses = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-4/3',
        '21:9': 'aspect-21/9',
        '1:1': 'aspect-square',
    }
    // اگر prop غیرمعتبر بود، fallback به 16:9
    return aspectRatioClasses[props.aspectRatio] || aspectRatioClasses['16:9']
})
</script>
