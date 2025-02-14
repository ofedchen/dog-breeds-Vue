<script setup>
import BreedCard from '@/components/BreedCard.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <h2>List of {{ size }} breeds</h2>
    <BreedCard />
</template>