<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
    breed: {
        type: Object,
        required: true
    }
})

function navigateTo(id) {
    router.push(`/breed/${id}`)
}


</script>

<template>
    <div :id="breed.id">
        <img @click="navigateTo(breed.id)" :src="breed.images.small.studio" :alt="breed.general.name">
        <h3 @click="navigateTo(breed.id)">{{ breed.general.name }}</h3>
        <h4>{{ breed.general.group }}</h4>
        <slot></slot>
    </div>
</template>