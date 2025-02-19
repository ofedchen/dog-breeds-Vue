<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { ref, watch, computed, inject, watchEffect } from 'vue';
import BreedCard from '../components/BreedCard.vue';
import NavSizes from '../components/NavSizes.vue';
import FavoriteIcon from '../components/FavoriteIcon.vue';

const route = useRoute();
const breedData = inject('breeds')

watchEffect(() => {
  console.log('Breeds updated:', breedData.value);
});

const breedSize = ref(route.params.size)

watch(() => route.params.size, (newSize) => {
  breedSize.value = newSize;
});


const filteredBreeds = computed(() => {
  if (!breedData.value) return [];

  console.log('Filtering breeds for size:', breedSize.value);
  return breedData.value.filter(breed => breed.physical.size === Number(breedSize.value));
});


const displaySize = computed(() => {
  console.log(breedSize.value);
  const sizesMap = { '1': 'x-small', '2': 'small', '3': 'medium', '4': 'large', '5': 'x-large' };
  return sizesMap[breedSize.value];
})

const isLoading = computed(() => !breedData.value);

</script>


<template>
  <RouterLink to="/">Back to homepage</RouterLink>
  <NavSizes />
  <h2>List of {{ displaySize }} breeds</h2>
  <section>
    <h3 v-if="isLoading">Loading breeds...</h3>
    <BreedCard v-for="breed in filteredBreeds" :breed="breed" :key="breed.id">
      <FavoriteIcon :breed="breed" />
    </BreedCard>
  </section>
</template>
