<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { inject, watchEffect, computed, ref } from 'vue';
import FavoriteIcon from '../components/FavoriteIcon.vue';

const route = useRoute();
const breedData = inject('breeds')

watchEffect(() => {
    console.log('Breeds updated:', breedData.value);
});

const breedId = ref(route.params.id)

const breedObject = computed(() => {
    if (!breedData.value) return [];

    let breedArray = []
    breedArray = breedData.value.filter(breed => breed.id === breedId.value)
    console.log(breedArray[0], "breedObject")
    return breedArray[0]
})

const height = computed(() => {
    return Math.round(breedObject.value.general.height / 0.39370)  //to cm
})

const weight = computed(() => {
    return (Math.round(breedObject.value.general.weight * 0.453)) // to kg
})

</script>

<template>
    <RouterLink to="/">Back to homepage</RouterLink>
    <main v-if="breedData">
        <FavoriteIcon :breed="breedObject" />
        <img :src="breedObject.images.large.indoors" :alt="breedObject.id">
        <h2><span style="color: rgb(7, 84, 172);">{{ breedObject.general.name }}</span>: breed information</h2>
        <h3>{{ breedObject.general.group }}</h3>
        <h4 id="b-height">Height: ~ {{ height }} cm</h4>
        <h4 id="b-weight">Weight: ~ {{ weight }} kg</h4>
        <h4 id="b-lifespan">Lifespan: {{ breedObject.general.lifespan }} years</h4>
        <p>{{ breedObject.general.longDescription }}</p>
        <ul>
            <li v-for="trait in breedObject.general.personalityTraits"> {{ trait }}</li>
        </ul>
        <figure></figure>
    </main>
</template>


<style scoped>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    margin: auto;
    padding-inline: 2em;
}

main {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    margin-block: 2.5em;
}

h1 {
    text-align: center;
    margin-block: 3em;
}

main img {
    width: 90%;
    max-width: none;
    grid-row: span 6;
}

h2 {
    grid-column: span 3;
}

h3 {
    grid-column: span 3;
}

ul {
    grid-column: span 3;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding-inline: 20%;
    padding-block: 0.5em;
    background-color: rgb(66, 127, 197);
    align-items: center;
}

li {
    color: white;
    list-style: none;
    font-weight: 600;
}

p {
    grid-column: span 3;
    font-size: 1.2em;
}

.favorite {
    width: 40px;
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}

h4 {
    color: rgb(13, 70, 134);
}

figure {
    grid-column: span 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>