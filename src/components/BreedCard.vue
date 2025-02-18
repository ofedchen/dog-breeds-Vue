<script setup>
import { defineProps } from 'vue';

defineProps({
    breed: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div :id="breed.id">
        <img :src="breed.images.small.studio" :alt="breed.general.name">
        <h3>{{ breed.general.name }}</h3>
        <h4>{{ breed.general.group }}</h4>
        <slot></slot>
    </div>
</template>