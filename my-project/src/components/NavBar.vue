<script setup>

import { defineProps } from 'vue';

defineProps({
    filterIcon: String
})

</script>

<template>
        <div class="search">
            <input type="text" placeholder="Search by breed name" id="searchfield" value="">
            <img class="icon" :src="filterIcon" alt="filters">
            <h5 id="remove-filters">⨯ Clear filters/search</h5>
            <div id="filter-container">
                <div id="filters">
                    <label for="filter-group">Group</label>
                    <select name="group" id="filter-group">
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
                    <select name="size" id="filter-size">
                        <option value="">Select</option>
                        <option value="1">X-Small</option>
                        <option value="2">Small</option>
                        <option value="3">Medium</option>
                        <option value="4">Large</option>
                        <option value="5">X-Large</option>
                    </select>

                    <label for="filter-child">Child friendly</label>
                    <select name="child-friendliness" id="filter-child">
                        <option value="">Select</option>
                        <option value="1">Not recommended</option>
                        <option value="2">Not too friendly</option>
                        <option value="3">Ok</option>
                        <option value="4">Good</option>
                        <option value="5">Great</option>
                    </select>

                    <label for="filter-exercise">Exercise needs</label>
                    <select name="exercise-needs" id="filter-exercise">
                        <option value="">Select</option>
                        <option value="1">low</option>
                        <option value="2">up to 30 min</option>
                        <option value="3">up to 1 hour</option>
                        <option value="4">up to 2 hours</option>
                        <option value="5">2+ hours</option>
                    </select>
                    <button>Search</button>
                </div>
            </div>
            <ul id="sizes">
                <li id="1">X-Small</li>
                <li id="2">Small</li>
                <li id="3">Medium</li>
                <li id="4">Large</li>
                <li id="5">X-Large</li>
            </ul>
        </div>
</template>