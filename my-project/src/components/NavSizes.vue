<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav>
    <ul id="sizes">
        <RouterLink to="/">All breeds</RouterLink>
        <RouterLink to="/breeds/" id="1">X-Small</RouterLink>
        <RouterLink to="" id="2">Small</RouterLink>
        <RouterLink to="" id="3">Medium</RouterLink>
        <RouterLink to="" id="4">Large</RouterLink>
        <RouterLink to="" id="5">X-Large</RouterLink>
    </ul>
</nav>
</template>