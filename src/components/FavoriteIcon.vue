<script setup>
import { inject } from 'vue'


defineProps({
  breed: {
    type: Object,
    required: true
  }
})

const { favoritesList, addToFavorites } = inject('favorites')

//checking if in favorites
function checkFavorites(breedId) {
  if (favoritesList.value.indexOf(breedId) < 0) {
    return "https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
  }
  else {
    return "https://img.icons8.com/?size=100&id=85138&format=png&color=000000"
  }
}

</script>

<template>
  <img class="favorite" :src="checkFavorites(breed.id)" @click="addToFavorites(breed.id)">
</template>