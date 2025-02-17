<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';

const isHomeView = (routePath) => {
    const route = useRoute();
    return route.path === routePath
}

const router = useRouter()

function navigate(size) {
    router.push(`/breeds/${size}`)
    console.log("navigated")
}

</script>

<template>
    <nav>
    <ul id="sizes">
        <RouterLink to="/" v-show="!isHomeView('/')" style="text-decoration: underline;">All breeds</RouterLink>
        <li @click="navigate(1)" id="1" style="text-decoration: underline;">X-Small</li>
        <RouterLink to="/breeds/2" id="2" style="text-decoration: underline;">Small</RouterLink>
        <RouterLink to="/breeds/3" id="3" style="text-decoration: underline;">Medium</RouterLink>
        <RouterLink to="/breeds/4" id="4" style="text-decoration: underline;">Large</RouterLink>
        <RouterLink to="/breeds/5" id="5" style="text-decoration: underline;">X-Large</RouterLink>
    </ul>
</nav>
</template>

<style scoped>
#sizes {
  width: 80%;
  display: flex;
  justify-content: space-between;
  grid-column: span 3;
  align-items: center;
  margin-inline: auto;
  margin-block: 1.5em;
}

li {
  list-style: none;
  text-decoration: underline;
  cursor: pointer;
}

</style>