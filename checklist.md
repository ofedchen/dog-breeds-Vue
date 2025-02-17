[x] event for favorites (add/delete) - how do I change the :src after the event? 
- watch on favoritesList and then computed checkFavorites()? 
[x] local storage and function (onMounted?)

[x] popular function
[x] navbar v-model & emits?
[x] search function
[x] filter function
[x] router for the breeds by size
6. router for the breed page
7. breed page component


const images = computed( () => {
Object.fromEntries(breedData.value.map(breed.id))
})


RouterView har props - send array
BreedCards component to show cards and send props
params as a variable to router and v-bind ????