<script setup>
import BreedCard from '../components/BreedCard.vue'
import NavSizes from '../components/NavSizes.vue';
import { RouterLink, RouterView } from 'vue-router'
import SearchResults from '../components/SearchResults.vue';
import MainSection from '../components/MainSection.vue';
</script>

<template>
    <h2>List of {{ size }} breeds</h2>
    <MainSection />
</template>