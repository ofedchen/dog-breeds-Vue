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
// const searchResults = ref([])
const searching = ref(false)
const searchTerm = ref('')
const groupFilter = ref('')
const sizeFilter = ref('')
const childFilter = ref('')
const exerciseFilter = ref('')

f()

async function f() {
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
  console.log(breedData.value, "before fav")
  for (let breed of breedData.value) {
    if (breed.general.popularity > 4) {
      let add = Math.floor(Math.random() * 7)
      if (add > 4) {
        popularBreeds.value.push(breed)
      }
    }
  }
  console.log(popularBreeds.value, "popular")
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

const searchResults = computed (() => {
  console.log(searchTerm.value, sizeFilter.value)
  if (searchTerm.value && searchTerm.value.length >= 2) {
      return breedData.value.filter(breed => breed.general.name.toLowerCase().includes(searchTerm.value))
    }
  if (sizeFilter.value) {
    return breedData.value.filter(breed => breed.physical.size === sizeFilter.value)
  }

  if (childFilterFilter.value) {
    return breedData.value.filter(breed => breed.behavior.childFriendly === childFilter.value)
  }

    return breedData.value
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
  // for (let breed of breedData.value) {
  //       if (name.value.length >= 2) {
  //           if (!breed.general.name.toLowerCase().includes(name.value)) {
  //             searchResults.value.push(breed)
  //               continue
  //           }
  //       }

        // if (document.getElementById("filter-size").value) {
        //     if (Number(document.getElementById("filter-size").value) !== breed.physical.size) {
        //         continue
        //     }
        // }

        // if (document.getElementById("filter-group").value) {
        //     if (document.getElementById("filter-group").value !== breed.general.group) {
        //         continue
        //     }
        // }

        // if (document.getElementById("filter-child").value) {
        //     if (Number(document.getElementById("filter-child").value) !== breed.behavior.childFriendly) {
        //         continue
        //     }
        // }

        // if (document.getElementById("filter-exercise").value) {
        //     if (Number(document.getElementById("filter-exercise").value) !== breed.care.exerciseNeeds) {
        //         continue
        //     }
        // }
    // }
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function clearFilters() {
  searching.value = false
  // searchTerm.value = ''
  showFilters.value = false
}


</script>

<template>
  <SearchFilters @search="filterSearch" @toggleFilters="toggleFilters" @clearSearch="clearFilters" :filterIcon="filterIcon" :filters="showFilters" :searching="searching" :searchText="searchTerm"/>
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
