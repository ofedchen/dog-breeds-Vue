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
      <!-- <RouterLink to="/" v-show="!isHomeView('/')" style="text-decoration: underline;">All breeds</RouterLink> -->
      <RouterLink to="/breeds/1" id="1" style="text-decoration: underline;">X-Small</RouterLink>
      <RouterLink to="/breeds/2" id="2" style="text-decoration: underline;">Small</RouterLink>
      <RouterLink to="/breeds/3" id="3" style="text-decoration: underline;">Medium</RouterLink>
      <RouterLink to="/breeds/4" id="4" style="text-decoration: underline;">Large</RouterLink>
      <RouterLink to="/breeds/5" id="5" style="text-decoration: underline;">X-Large</RouterLink>
    </ul>
  </nav>
</template>

<style scoped>
#sizes {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2px;
  grid-column: span 3;
  align-items: center;
  margin-inline: auto;
  margin-block: 1.5em;
  padding-left: 0;
}

li {
  list-style: none;
  text-decoration: underline;
  cursor: pointer;
}

@media (min-width: 768px) {
  #sizes {
    width: 80%;
  }
}
</style>