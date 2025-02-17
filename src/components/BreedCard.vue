<script setup>
import { ref, defineProps, computed } from 'vue';

const favIcon = ref('https://img.icons8.com/?size=100&id=85038&format=png&color=000000')
const notFavIcon = ref('https://img.icons8.com/?size=100&id=85138&format=png&color=000000')


defineProps({
    breed: Object,
})

</script>

<template>
<div :id="breed.id">
        <img :src="breed.images.small.studio" :alt="breed.general.name">
        <h3>{{ breed.general.name }}</h3>
        <h4>{{ breed.general.group }}</h4>
        <slot></slot>
    </div>
</template>