<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isHomeView = (routePath) => {
    const route = useRoute();
    return route.path === routePath
}
</script>

<template>
    <nav>
    <ul id="sizes">
        <RouterLink to="/" v-show="!isHomeView('/')" style="text-decoration: underline;">All breeds</RouterLink>
        <RouterLink to="/breeds/1" id="1" style="text-decoration: underline;">X-Small</RouterLink>
        <RouterLink to="" id="2" style="text-decoration: underline;">Small</RouterLink>
        <RouterLink to="" id="3" style="text-decoration: underline;">Medium</RouterLink>
        <RouterLink to="" id="4" style="text-decoration: underline;">Large</RouterLink>
        <RouterLink to="" id="5" style="text-decoration: underline;">X-Large</RouterLink>
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