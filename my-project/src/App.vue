<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed, onBeforeMount } from 'vue'

import NavBar from './components/NavBar.vue';
import BreedCard from './components/BreedCard.vue';
import SearchResults from './components/SearchResults.vue';

import filterIcon from '../assets/adjustment_11798090.png'

let breedData = ref([])
let searchResults = ref([])
const searching = ref(false)
let favoritesList = ref([])
let popularBreeds = ref([])

f()

async function f() {
  try {
    // const response = await fetch('https://registry.dog/api/v1')
    // const data = await response.json()
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
  // localStorage.setItem("fav", JSON.stringify(favoritesList.value))
}



</script>

<template>
  <h1>Discover the perfect dog breed for you</h1>
  <NavBar :filterIcon="filterIcon" />
  <SearchResults v-if="searching">
    <BreedCard v-for="breed in searchResults" :breed="breed" :key="breed.id">
    </BreedCard>
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
  <footer>
    <a href="https://www.flaticon.com/free-icons/dog" title="dog icons">Dog icons created by Freepik - Flaticon</a>
    <p>Made using <a href="https://github.com/chase-manning/open-dog-registry" target="_blank">Open Dog Registry
        API</a></p>
  </footer>
</template>


<style>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  margin-inline: 3em;
}

h1 {
  text-align: center;
  margin-block: 1.5em 1em;
}

.search {
  width: 90%;
  display: grid;
  grid-template-columns: 4fr 0.3fr 1fr;
  column-gap: 1em;
  row-gap: 8px;
}

input {
  font-size: 1em;
  padding-inline: 12px;
  padding-block: 5px;
}

.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 7px;
}

#remove-filters {
  display: none;
  font-weight: 500;
  font-size: 1em;
  cursor: pointer;
}

#remove-filters:hover {
  font-weight: 600;
}

#filter-container {
  width: 100%;
  /* height: 1.2em; */
  padding: 5px;
  grid-column: span 3;
}

#filters {
  width: 100%;
  display: none;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
  margin: 0;
  padding: 0;
}

select {
  font-size: 1em;
}

option:checked {
  border: 2px solid rgb(66, 127, 197);
}

button {
  padding-block: 7px;
  padding-inline: 25px;
  border: 3px solid rgb(66, 127, 197);
  border-radius: 10px;
  background-color: white;
  color: rgb(16, 102, 201);
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}

#sizes {
  width: 80%;
  display: flex;
  justify-content: space-between;
  grid-column: span 3;
  align-items: center;
  margin-inline: auto;
}

li {
  list-style: none;
  text-decoration: underline;
  cursor: pointer;
}

#search-container {
  width: 100%;
  margin-top: 1em;
}

section {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px;
  margin: 3em 0 1em 0;
}

section>div {
  width: 10%;
  min-width: 150px;
  padding: 10px;
  margin: 5px;
  position: relative;
  text-align: center;
}

section>div:hover {
  box-shadow: 6px 7px 20px -8px rgba(86, 138, 199, 1);
}

img {
  width: 150px;
}

.favorite {
  width: 28px;
  position: absolute;
  top: -5%;
  right: 5%;
  cursor: pointer;
}

h3 {
  font-size: 1.1em;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  /* text-decoration: underline; */
  color: rgb(13, 70, 134);
}

h4 {
  font-size: 0.9em;
  font-weight: 500;
  margin-top: 0;
}
</style>