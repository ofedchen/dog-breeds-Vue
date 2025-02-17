<script setup>
import { ref, computed, inject, watchEffect, provide } from 'vue'

import SearchFilters from './SearchFilters.vue';
import NavSizes from './NavSizes.vue';
import BreedCard from './BreedCard.vue';
import SearchResults from './SearchResults.vue';
import FavoriteIcon from './FavoriteIcon.vue';

import filterIcon from '../assets/adjustment_11798090.png'

const breedData = inject('breeds')
watchEffect(() => {
  console.log('Breeds updated:', breedData.value);
});


const showFilters = ref(false)
const searching = ref(false)
const searchTerm = ref('')
const groupFilter = ref('')
const sizeFilter = ref('')
const childFilter = ref('')
const exerciseFilter = ref('')

const searchObj = ref({})
provide('searchObj', searchObj)


// function to add a breed to Popular section
const popularBreeds = computed(() => {
  if (!breedData.value) return []
  console.log('Creating popular breeds section');
  return toPopular();
})


function toPopular() {
  let pop_breeds = [];
  let indexes = []
  for (let [index, breed] of breedData.value.entries()) {
    if (breed.general.popularity > 4) {
      indexes.push(index);
    }
  }
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * indexes.length);
    pop_breeds.push(breedData.value[index]);
    indexes.splice(index, 1);
  }
  return pop_breeds
}


//Search and filtering function returns a searchResults array
const searchResults = computed(() => {
  console.log(searchTerm.value, sizeFilter.value)
  let result = breedData.value
  if (searchTerm.value && searchTerm.value.length >= 1) {
    result = result.filter(breed => breed.general.name.toLowerCase().includes(searchTerm.value))
  }
  if (sizeFilter.value) {
    result = result.filter(breed => breed.physical.size === sizeFilter.value)
  }

  if (childFilter.value) {
    result = result.filter(breed => breed.behavior.childFriendly === childFilter.value)
  }

  if (groupFilter.value) {
    result = result.filter(breed => breed.general.group === groupFilter.value)
  }

  if (exerciseFilter.value) {
    result = result.filter(breed => breed.care.exerciseNeeds === exerciseFilter.value)
  }

  return result
}

)

function filterSearch(search) {
  searchTerm.value = search.text
  sizeFilter.value = Number(search.size)
  groupFilter.value = search.group
  childFilter.value = Number(search.child)
  exerciseFilter.value = Number(search.exercise)
  searching.value = true
  console.log('got filtered ', searchTerm.value)
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function clearFilters() {
  searching.value = false
  showFilters.value = false
  searchObj.value = {}
}

</script>

<template>
  <SearchFilters @search="filterSearch" @toggleFilters="toggleFilters" @clearSearch="clearFilters"
    :filterIcon="filterIcon" :filters="showFilters" :searching="searching" :searchText="searchTerm" />
  <NavSizes />
  <SearchResults v-if="searching" :searchResults="searchResults">
  </SearchResults>
  <h2 id="popular-heading">Popular</h2>
  <section id="popular">
    <BreedCard v-for="breed in popularBreeds" :breed="breed" :key="breed.id">
      <FavoriteIcon :breed="breed" />
    </BreedCard>
  </section>
  <h2>All breeds</h2>
  <section>
    <BreedCard v-for="breed in breedData" :breed="breed" :key="breed.id">
      <FavoriteIcon :breed="breed" />
    </BreedCard>
  </section>
</template>
