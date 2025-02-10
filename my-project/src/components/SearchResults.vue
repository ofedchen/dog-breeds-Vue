<script setup>
import { computed, defineProps } from 'vue';
import BreedCard from './BreedCard.vue';

const props = defineProps({
    searchResults: Array
})

const numberOfResults = computed(() => props.searchResults.length);
</script>

<template>
    <h2> Search results({{ numberOfResults }})</h2>
    <section>
        <BreedCard v-for="breed in searchResults" :breed="breed" :key="breed.id" />
        <slot></slot>
    </section>
</template>