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
        result += `<div class="row"><div class="col-md-6">
        <div class="flip-card"><div class="flip-card-inner" onclick=flipCard(this)>
            <div class="flip-card-front">
            <p>Title:${array[i].title}</p>
            </div>
            <div class="flip-card-back">
            <p> Author: ${array[i].artist}</p>
            <p> Year Published: ${array[i].published} </p>
            </div></div></div> 
        </div><div class="col-md-6">
        <div class="flip-card"><div class="flip-card-inner" onclick=flipCard(this)>
            <div class="flip-card-front">
            <p>Title:${array[i+1].title}</p>
            </div>
            <div class="flip-card-back">
            <p> Author: ${array[i+1].artist}</p>
            <p> Year Published: ${array[i+1].published} </p>
            </div></div></div>
        </div></div>`;
    }
    return result
}

// flip the card when clicked
function flipCard(element){
    element.classList.toggle('is-flipped')
}

// ***************** FUNCTION CALLS *************** //
document.getElementById('booksTable').innerHTML=fillBooks(ArrOfBooks)

fetch("https://api.myjson.com/bins/1h3vb3").then((response)=> {
    if (response.status !== 200) {
        console.log("something dun gon wrong. Status: "+ response.status)
    } else {
        console.log(response.json())
    }
})