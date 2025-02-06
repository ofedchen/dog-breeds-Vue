<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    searchResults: Array,
})

const numberOfResults = computed(() => props.searchResults.length);
</script>

<template>
    <section>
        <slot></slot>
    </section>
</template>