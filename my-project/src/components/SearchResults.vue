<script setup>
import { defineProps } from 'vue';

defineProps({
    searchResults: Array,
})

</script>

<template>
    <section>
        <slot></slot>
    </section>
</template>