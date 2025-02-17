import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import { ref } from 'vue'

const app = createApp(App)

const breedData = ref(null)

fetchBreeds()

async function fetchBreeds() {
    try {
        const response = await axios.get('https://registry.dog/api/v1')
        breedData.value = response.data.data
        console.log(breedData.value, "fetch")

        // toPopular();
    }
    catch (error) {
        console.log('Error fetching breeds')
    }
}

app.provide('breeds', breedData)

app.use(router)
app.mount('#app')