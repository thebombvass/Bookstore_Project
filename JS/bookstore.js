//main js//
let ArrOfBooks = [
    {title: "Test Book 1",
    artist: "Mr Guy Dude",
    published: "1996"},
    {title: "Test Book 2",
    artist: "Mrs. Lady Woman",
    published: "1995"},
    {title: "Test Book 3",
    artist: "Dr Goof",
    published: "1919"},
    {title: "Test Book 4",
    artist: "Old Person",
    published: "1864"}
] 

// ************** FUNCTION DEFINITIONS ************** //
function fillBooks(array) {
    let result = ""
    for (i=0; i<array.length; i+=2) {
        let lang = array[i].language == "en" ? "English": (array[i].language == "es" ? "Español" : "Catalan")
        if (array[i+1]) {
        let lang2 = array[i+1].language == "en" ? "English": (array[i+1].language == "es" ? "Español" : "Catalan")
        result += `
        <div class="row">
            <div class="col-md-6">
            <div class="d-flex d-flex flex-column align-items-center text-center">
            <div class="flip-card">
                <div class="flip-card-inner" onclick=flipCard(this)>
                    <div class="flip-card-front">
                    <img src="${array[i].cover}" alt="book cover">
                    </div>
                    <div class="flip-card-back">
                    <p> <u>Description:</u> ${array[i].description}<p>
                    <p> Language: ${lang}</p>
                    <a data-fancybox="gallery" href="${array[i].detail}" data-caption="${array[i].title}">See More</a>
                    </div>
                </div>
                </div>
                <p class="title">${array[i].title}</p>
            </div> 
        </div>
        <div class="col-md-6">
        <div  class="d-flex d-flex flex-column align-items-center text-center">
            <div class="flip-card"><div class="flip-card-inner" onclick=flipCard(this)>
                <div class="flip-card-front">
                <img src="${array[i+1].cover}" alt="book cover">
                </div>
                <div class="flip-card-back">
                <p> <u>Description:</u> ${array[i+1].description}<p>
                <p> Language: ${lang}</p>
                <a data-fancybox="gallery" href="${array[i+1].detail}" data-caption="${array[i+1].title}">See More</a>
                </div></div></div>
                <p class="title">${array[i+1].title}</p>
                </div>
        </div></div>`;
        } else {
            result += `<div class="row"><div class="col-md-6 d-flex d-flex justify-content-center text-center"><div>
        <div class="flip-card"><div class="flip-card-inner" onclick=flipCard(this)>
            <div class="flip-card-front">
            <img src="${array[i].cover}" alt="book cover">
            </div>
            <div class="flip-card-back">
            <p> <u>Description:</u> ${array[i].description}<p>
            <p> Language: ${lang}</p>
            <a data-fancybox="gallery" href="${array[i].detail}" data-caption="${array[i].title}">See More</a>
            </div></div></div>
            <p class="title">${array[i].title}</p>
            </div> 
        </div><div class="col-md-6"></div>`;
        }
    }
    return result
}

// flip the card when clicked
function flipCard(element){
    element.classList.toggle('is-flipped')
}

//search for title
function searchByTitle(query, array) {
    let newarray = []
    for (i=0; i<array.length; i++) {
        if (array[i].title.toLowerCase().includes(query.toLowerCase())) {
        newarray.push(array[i]);
        }
    }
    return newarray
}

// sort alphabetically by A to Z or Z to A
function sortBy(array, value) {
    console.log(value)
    let orderedArray = []
    if (value == "AZ") {
        orderedArray = array.sort((a,b)=> a.title.localeCompare(b.title))
    } else if (value == "ZA") {
        orderedArray = array.sort((a,b)=> a.title.localeCompare(b.title)).reverse()
    } else {
        orderedArray = array
    }
    return orderedArray
}

//filter by language 
function filterByLanguage(array, value) {
    let filteredArray = []
    if (value == "EN") {
        filteredArray = array.filter((book) => {
            return book.language == "en"
        })
    } else if (value == "ES") {
        filteredArray = array.filter((book) => {
            return book.language == "es"
        })
    } else if (value == "CA") {
        filteredArray = array.filter((book) => {
            return book.language == "ca"
        })
    } else {
        filteredArray = array
    }
    return filteredArray
}

function theMasterFilterFunction(array, lang, query, sorter) {
    let booksTable = document.getElementById('booksTable')
    let finalArray = sortBy(searchByTitle(query, filterByLanguage(array,lang)), sorter)
    booksTable.innerHTML = fillBooks(finalArray)
}


// ***************** FUNCTION CALLS *************** //

//ajax for books info 
fetch("https://api.myjson.com/bins/zyv02").then((response)=> {
    if (response.status !== 200) {
        console.log("something dun gon wrong. Status: "+ response.status)
    } else {
        return response.json();
    }
}).then((json) => {
    //fill all the books in books table
    document.getElementById('booksTable').innerHTML=fillBooks(json.books)
    //filter by search terms
    document.getElementById("search").addEventListener("keyup", function() {
        let query = document.getElementById("search").value
        let lang = document.getElementById("langSelect").value
        let sorter = document.getElementById("sortSelect").value
        console.log(query, lang, sorter)
        theMasterFilterFunction(json.books,lang,query,sorter)
    })
    document.getElementById("langSelect").addEventListener("change", function() {
        let query = document.getElementById("search").value
        let lang = document.getElementById("langSelect").value
        let sorter = document.getElementById("sortSelect").value
        console.log(query, lang, sorter)
        theMasterFilterFunction(json.books,lang,query,sorter)
    })
    document.getElementById("sortSelect").addEventListener("change", function() {
        let query = document.getElementById("search").value
        let lang = document.getElementById("langSelect").value
        let sorter = document.getElementById("sortSelect").value
        console.log(query, lang, sorter)
        theMasterFilterFunction(json.books,lang,query,sorter)
    })
})


//data is 
// cover - href to image
// description - str
// detail - URL
// language - tag en,es,ca
// title- str

