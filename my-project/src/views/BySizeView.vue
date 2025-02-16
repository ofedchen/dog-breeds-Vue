<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import axios from 'axios'
import BreedCard from '../components/BreedCard.vue'
import NavSizes from '../components/NavSizes.vue';
// import SearchResults from '../components/SearchResults.vue';
// import MainSection from '../components/MainSection.vue';
import { computed } from 'vue';

const route = useRoute();

const loading = ref(false)
const post = ref(null)
const error = ref(null)

const breedData = ref([])
const breedSize = ref('')


// watch the params of the route to fetch the data again
watch(() => route.params.size, fetchBreeds, { immediate: true })

// watch(() => route.params.size, (newVal) => {
    
// })

async function fetchBreeds(size) {
  error.value = post.value = null
  loading.value = true
  breedSize.value = size
  
  try {
    // replace `getPost` with your data fetching util / API wrapper
    const response = await axios.get('https://registry.dog/api/v1')
    breedData.value = response.data.data.filter(breed => breed.physical.size === Number(size))

  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

const displaySize = computed(() => {
    console.log(breedSize.value)
    if (breedSize.value === '1')
        return "x-small"
    else if (breedSize.value === '2')
        return "small"
    else if (breedSize.value === '3')
        return "medium"
    else if (breedSize.value === '4')
        return "large"
    else
        return "x-large"
})

// fetchBreeds()

// async function fetchBreeds() {
//     try {
//         const response = await axios.get('https://registry.dog/api/v1')
//         console.log(response.data.data, "fetch")
//         breedData.value = response.data.data.filter(breed => breed.physical.size === Number(size))
//         console.log(breedData.value, "filtered")

//         // toFiltered()
//     }
//     catch (error) {
//         console.log('Error fetching breeds')
//     }
// }

// function toFiltered() {
//     breedData.value = breedData.value.filter(breed => breed.physical.size === size)
//     console.log(breedData.value)
//     return breedData.value
// }


</script>

<template>
    <NavSizes />
    <h2>List of {{ displaySize }} breeds</h2>
    <section>
        <BreedCard v-for="breed in breedData" :breed="breed" :key="breed.id">
            <!-- <img class="favorite" :src="checkFavorites(breed.id)" @click="addToFavorites(breed.id)"> -->
        </BreedCard>
    </section>
</template>