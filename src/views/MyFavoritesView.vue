<script setup>
import { RouterLink } from 'vue-router';
import { computed, inject, watchEffect } from 'vue';
import BreedCard from '../components/BreedCard.vue';
import FavoriteIcon from '../components/FavoriteIcon.vue';

const {favoritesList, addToFavorites} = inject('favorites')
const breedData = inject('breeds')

watchEffect(() => {
  console.log('Favorites updated:', favoritesList.value);
  console.log('Breeds updated:', breedData.value);
});

const favoriteBreeds = computed (() => {
    if (!breedData.value) return [];

console.log('Filtering favorites');
return breedData.value.filter(breed => favoritesList.value.indexOf(breed.id) >= 0);
})


const isLoading = computed(() => !favoritesList.value);
const noFavorites = computed(() => favoritesList.value.length === 0)

</script>


<template>
    <RouterLink to="/">Back to homepage</RouterLink>
  <h2>My favorite breeds</h2>
  <section>
    <h3 v-if="isLoading">Loading breeds...</h3>
    <h3 v-if="noFavorites">You haven't added favorite breeds yet</h3>
    <BreedCard v-for="breed in favoriteBreeds" :breed="breed" :key="breed.id">
      <FavoriteIcon :breed="breed" />
    </BreedCard>
  </section>
</template>
