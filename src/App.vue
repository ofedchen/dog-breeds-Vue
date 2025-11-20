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
  <RouterLink to="/favorites" style="margin-block: 1em;"><span id="fav-menu">💙 Favorite breeds</span></RouterLink>
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
  margin-inline: 1em;
  margin-top: 3em;
}

h1 {
  text-align: center;
  margin-block: 2em 0.5em;
  font-size: 1.5em;
}

h2 {
  padding-inline: 15px;
}

h2 {
  padding-inline: 15px;
}

.search {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
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
  display: block;
  text-align: center;
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
  padding: 5px;
}

#filters {
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  margin: 0;
  padding: 0;
}

select {
  font-size: 1em;
  width: 100%;
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
  width: 100%;
}

#search-container {
  width: 100%;
  margin-top: 1em;
}

section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin: 2em 0 1em 0;
}

section>div {
  width: 100%;
  max-width: 150px;
  padding: 10px;
  margin: 5px;
  position: relative;
  text-align: center;
}

section>div:hover {
  box-shadow: 6px 7px 20px -8px rgba(86, 138, 199, 1);
}

img {
  width: 100%;
  max-width: 150px;
  cursor: pointer;
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
  cursor: pointer;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: rgb(13, 70, 134);
}

h4 {
  font-size: 0.9em;
  font-weight: 500;
  margin-top: 0;
}

footer {
  text-align: center;
  font-size: 0.9em;
  margin-top: 2em;
}

/* Tablet and up */
@media (min-width: 768px) {
  body {
    margin-inline: 2em;
  }

  h1 {
    font-size: 2em;
    margin-block: 1.5em 1em;
  }

  .search {
    width: 90%;
    grid-template-columns: 4fr 0.3fr 1fr;
    column-gap: 1em;
  }

  #fav-menu {
    text-align: right;
    margin-right: 2em;
  }

  #filter-container {
    grid-column: span 3;
  }

  #filters {
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  select {
    width: auto;
  }

  button {
    width: auto;
    align-self: flex-start;
  }

  section {
    justify-content: flex-start;
    margin: 3em 0 1em 0;
  }

  section>div {
    width: calc(50% - 30px);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  body {
    margin-inline: 3em;
    margin-top: 3em;
  }

  section>div {
    width: calc(33.333% - 30px);
    min-width: 150px;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  section>div {
    width: 10%;
  }
}
</style>