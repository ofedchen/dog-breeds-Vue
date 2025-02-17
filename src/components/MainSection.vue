<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'

import SearchFilters from './SearchFilters.vue';
import NavSizes from './NavSizes.vue';
import BreedCard from './BreedCard.vue';
import SearchResults from './SearchResults.vue';

import filterIcon from '../assets/adjustment_11798090.png'

const breedData = ref([])
const favoritesList = ref([])
const popularBreeds = ref([])
const showFilters = ref(false)
const searching = ref(false)
const searchTerm = ref('')
const groupFilter = ref('')
const sizeFilter = ref('')
const childFilter = ref('')
const exerciseFilter = ref('')

fetchBreeds()

async function fetchBreeds() {
  try {
    const response = await axios.get('https://registry.dog/api/v1')
    breedData.value = response.data.data
    console.log(breedData.value, "fetch")

    toPopular();
  }
  catch (error) {
    console.log('Error fetching breeds')
  }
}


onMounted(() => {
  // function to sync favorites with the local storage
  if (localStorage.getItem("fav") && localStorage.getItem("fav") !== null) {
    favoritesList.value = JSON.parse(localStorage.getItem("fav"))
    console.log(favoritesList.value)
  }
});


// function to add a breed to Popular section
function toPopular() {
  let pop_breeds = [];
  for (let [index, breed] of breedData.value.entries()) {
    if (breed.general.popularity > 4) {
      pop_breeds.push(index);
    }
  }
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * pop_breeds.length);
    popularBreeds.value.push(breedData.value[index]);
    pop_breeds.splice(index, 1);
  }
}


//checking if in favorites
function checkFavorites(breedId) {
  if (favoritesList.value.indexOf(breedId) < 0) {
    return "https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
  }
  else {
    return "https://img.icons8.com/?size=100&id=85138&format=png&color=000000"
  }
}

watch(favoritesList, (newVal) => {
  localStorage.setItem('fav', JSON.stringify(newVal))
}, { deep: true })

//adding or removing from favorites list
function addToFavorites(id) {
  if (favoritesList.value.indexOf(id) >= 0) {
    favoritesList.value.splice(favoritesList.value.indexOf(id), 1)
  }
  else {
    favoritesList.value.push(id)
  }
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
      <img class="favorite" :src="checkFavorites(breed.id)" @click="addToFavorites(breed.id)">
    </BreedCard>
  </section>
  <h2>All breeds</h2>
  <section>
    <BreedCard v-for="breed in breedData" :breed="breed" :key="breed.id">
      <img class="favorite" :src="checkFavorites(breed.id)" @click="addToFavorites(breed.id)">
    </BreedCard>
  </section>
</template>
