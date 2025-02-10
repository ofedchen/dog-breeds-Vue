// const app = Vue.createApp({})

// app.component('breed-card', {
//     created() {
//         this.displayBreeds()
//     },
//     data() {
//         return {
//             breeds: null,
//             iconFav: {
//                 // default: "https://img.icons8.com/?size=100&id=85138&format=png&color=000000",
//                 // added: "https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
//             }
//         }
//     },
//     methods: {
//         displayBreeds() {
//             fetch('https://registry.dog/api/v1')
//                 .then(response => response.json())
//                 .then(result => {
//                     this.breeds = result.data
//                 })
//         }
//     },
//     template: `
//     <div id="breed.id" v-for="breed in breeds">
//         <img :src="breed.images.small.studio" :alt="breed.general.name">
//         <h3>{{ breed.general.name }}</h3>
//         <h4>{{ breed.general.group }}</h4>
//         <img class="favorite" :src="iconFav">
//     </div>
//     `
// })

// app.mount('#app')




// let favoritesList = []

// //Restore favorites from local storage

// if (localStorage.getItem("fav") && localStorage.getItem("fav") !== null) {
//     favoritesList = JSON.parse(localStorage.getItem("fav"))
//     console.log(favoritesList)
// }

/*

//DISPLAYS THE BREEDS
function displayOnPage(result) {
    // for (breed of result.data) {
    //     breedContainer = document.createElement('div')
    //     let breedImage = document.createElement('img')
    //     let breedName = document.createElement('h3')
    //     let breedLink = document.createElement("a")
    //     let breedGroup = document.createElement('h4')
    //     let favoriteIcon = document.createElement("img") //Should be the last child! used in a favorite function

    // breedContainer.append(breedImage, breedName, breedGroup, favoriteIcon)
    // allSection.appendChild(breedContainer)
    // breedName.appendChild(breedLink)

    // breedContainer.setAttribute("id", breed.id)
    // breedContainer.setAttribute("class", breed.id) 
    // breedLink.href = `/breed-page.html?breed_id=${breed.id}` //to open the page with additional info
    // breedLink.textContent = breed.general.name
    // breedGroup.textContent = breed.general.group
    // breedImage.setAttribute("src", breed.images.small.studio)

    if (favoritesList.indexOf(breed.id) >= 0) {
        favoriteIcon.setAttribute("src", "https://img.icons8.com/?size=100&id=85138&format=png&color=000000")
    }
    else {
        favoriteIcon.setAttribute("src", "https://img.icons8.com/?size=100&id=85038&format=png&color=000000")
    }
    favoriteIcon.setAttribute("class", "favorite")

    addToFavorites(breed, breedContainer.getAttribute("id"))

    //randomly selects which breeds to whow in the Popular section
    if (breed.general.popularity > 4) {
        let add = Math.floor(Math.random() * 7)
        if (add > 4) {
            let breedContainerPop = breedContainer.cloneNode(true)
            breedContainerPop.setAttribute("id", breed.id + "-pop")
            popularSection.appendChild(breedContainerPop)
            addToFavorites(breed, breedContainerPop.getAttribute("id"))
        }
    }
}
}

//FAVORITES
function addToFavorites(breed, id) {
    let addToFav = document.getElementById(id).lastChild

    addToFav.addEventListener("click", () => {
        if (favoritesList.indexOf(breed.id) >= 0) {
            addToFav.setAttribute("src", "https://img.icons8.com/?size=100&id=85038&format=png&color=000000")
            favoritesList.splice(favoritesList.indexOf(breed.id), 1)
        }
        else {
            addToFav.setAttribute("src", "https://img.icons8.com/?size=100&id=85138&format=png&color=000000")
            favoritesList.push(breed.id)
        }

        localStorage.setItem("fav", JSON.stringify(favoritesList))
        console.log(localStorage.getItem("fav"))
    })


}


//SHOW FILTERS
let hidden = true
document.querySelector(".icon").addEventListener("click", () => {
    if (hidden) {
        document.querySelector("#filters").style.display = "flex"
        hidden = false
    } else {
        document.querySelector("#filters").style.display = "none"
        hidden = true
    }
})

//SEARCH AND FILTERS FUNCTION
function filterSearch(breedArray) {
    let counter = 0

    for (breed of breedArray) {
        if (document.getElementById("searchfield").value.length >= 2) {
            if (!breed.general.name.toLowerCase().includes(document.getElementById("searchfield").value)) {
                continue
            }
        }

        if (document.getElementById("filter-size").value) {
            if (Number(document.getElementById("filter-size").value) !== breed.physical.size) {
                continue
            }
        }

        if (document.getElementById("filter-group").value) {
            if (document.getElementById("filter-group").value !== breed.general.group) {
                continue
            }
        }

        if (document.getElementById("filter-child").value) {
            if (Number(document.getElementById("filter-child").value) !== breed.behavior.childFriendly) {
                continue
            }
        }

        if (document.getElementById("filter-exercise").value) {
            if (Number(document.getElementById("filter-exercise").value) !== breed.care.exerciseNeeds) {
                continue
            }
        }

        counter += 1
        let breedContainerSearch = document.getElementById(breed.id).cloneNode(true)
        breedContainerSearch.setAttribute("id", breed.id + "-search")
        searchResultsSection.appendChild(breedContainerSearch)
        addToFavorites(breed, breedContainerSearch.getAttribute("id"))
    }
    return counter
}

//DISPLAY SEARCH RESULTS 
function displaySearchResults() {
    searchContainer.innerHTML = ""
    searchResultsH2 = document.createElement("h2")
    searchResultsSection = document.createElement("section")
    searchContainer.appendChild(searchResultsSection)
    searchContainer.insertBefore(searchResultsH2, searchResultsSection)

    let counterResults = filterSearch(breedData)

    searchResultsH2.innerHTML = `Search results for "${document.getElementById("searchfield").value}" (${counterResults})`
    document.getElementById("sizes").style.display = "none"
    removeFilters.style.display = "block"
}


//APPLYING ALL FILTERS AND SEARCH
//Button event
document.querySelector("button").addEventListener("click", (breedData) => displaySearchResults(breedData))

//Enter key event
document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;

        if (keyName === "Enter")
            displaySearchResults(breedData)
    });


// CLEARING THE SEARCH RESULTS
removeFilters.addEventListener("click", () => {
    searchContainer.innerHTML = ""
    removeFilters.style.display = "none"
    document.getElementById("sizes").style.display = "flex"
    document.querySelector("#filters").style.display = "none"
    hidden = true

    let filtersToRemove = document.querySelectorAll("select")
    for (filter of filtersToRemove) {
        filter.value = ""
    }
    document.getElementById("searchfield").value = ""
})

// QUICK FILTERS BY SIZE
let sizes = document.querySelectorAll("li")
for (let size of sizes) {
    size.addEventListener("click", () => {
        searchResultsH2 = document.createElement("h2")
        searchResultsSection = document.createElement("section")
        searchResultsH2.textContent = size.textContent + " breeds"
        searchContainer.appendChild(searchResultsH2)
        searchContainer.appendChild(searchResultsSection)

        filterBySize(breedData, size.getAttribute("id"))
    })
}

// FUNCTION FOR QUICK FILTERS BY SIZE
function filterBySize(breedData, id) {

    for (breed of breedData) {
        if (Number(id) === breed.physical.size) {
            let breedContainerSearch = document.getElementById(breed.id).cloneNode(true)
            breedContainerSearch.setAttribute("id", breed.id + "-filter")
            searchResultsSection.appendChild(breedContainerSearch)

            addToFavorites(breed, breedContainerSearch.getAttribute("id"))

            removeFilters.style.display = "block"
        }
    }
}

*/
