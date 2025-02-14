<script setup>

import { defineProps, defineEmits, ref } from 'vue';


defineProps({
    filterIcon: String,
    breeds: Array,
    filters: Boolean,
    searching: Boolean,
    // searchText: String
})

const searchObj = ref({})

const emit = defineEmits(['search', 'toggleFilters', 'clearSearch'])


const search = () => {
    emit('search', searchObj.value)
}
const clearSearch = () => {
    emit('clearSearch')
    searchObj.value = {}
}
const toggleFilters = () => {
    emit('toggleFilters')
}

</script>

<template>
        <div class="search">
            <input type="text" placeholder="Search by breed name" id="searchfield" v-model="searchObj.text" @keyup.enter="search">
            <img @click="toggleFilters" class="icon" :src="filterIcon" alt="filters">
            <h5 @click="clearSearch" id="remove-filters" v-show="searching">⨯ Clear filters/search</h5>
            <div id="filter-container" v-show="filters">
                <div id="filters">
                    <label for="filter-group">Group</label>
                    <select name="group" id="filter-group" v-model="searchObj.group">
                        <option value="">Select</option>
                        <option value="Companion">Companion</option>
                        <option value="Sporting">Sporting</option>
                        <option value="Working">Working</option>
                        <option value="Hound">Hound</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Terrier">Terrier</option>
                        <option value="Herding">Herding</option>
                    </select>

                    <label for="filter-size">Size</label>
                    <select name="size" id="filter-size" v-model="searchObj.size">
                        <option value="">Select</option>
                        <option value="1">X-Small</option>
                        <option value="2">Small</option>
                        <option value="3">Medium</option>
                        <option value="4">Large</option>
                        <option value="5">X-Large</option>
                    </select>

                    <label for="filter-child">Child friendly</label>
                    <select name="child-friendliness" id="filter-child" v-model="searchObj.child">
                        <option value="">Select</option>
                        <option value="1">Not recommended</option>
                        <option value="2">Not too friendly</option>
                        <option value="3">Ok</option>
                        <option value="4">Good</option>
                        <option value="5">Great</option>
                    </select>

                    <label for="filter-exercise">Exercise needs</label>
                    <select name="exercise-needs" id="filter-exercise" v-model="searchObj.exercise">
                        <option value="">Select</option>
                        <option value="1">low</option>
                        <option value="2">up to 30 min</option>
                        <option value="3">up to 1 hour</option>
                        <option value="4">up to 2 hours</option>
                        <option value="5">2+ hours</option>
                    </select>
                    <button @click="search">Search</button>
                </div>
            </div>
        </div>
</template>