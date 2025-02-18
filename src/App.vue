<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { ref, onMounted, provide, watch } from 'vue'

const favoritesList = ref([])

onMounted(() => {
  // function to sync favorites with the local storage
  if (localStorage.getItem("fav") && localStorage.getItem("fav") !== null) {
    favoritesList.value = JSON.parse(localStorage.getItem("fav"))
    console.log(favoritesList.value)
  }
});

watch(favoritesList, (newVal) => {
  localStorage.setItem('fav', JSON.stringify(newVal))
  console.log(favoritesList.value)
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

provide('favorites', {
  favoritesList,
  addToFavorites
})

</script>

<template>
  <h1>Discover the perfect dog breed for you</h1>
  <RouterLink to="/favorites"><span id="fav-menu">💙 Favorite breeds</span></RouterLink>
  <RouterView />
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

#fav-menu {
  position: relative;
  left: 80%;
  margin-block: 1em;
}

#remove-filters {
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