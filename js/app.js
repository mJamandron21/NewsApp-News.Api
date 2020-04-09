const API_KEY = '09f3023e7b154f1582dbf07379774e0a'
const COUNTRY_CODE = document.querySelector('#selectCountry')
const CATEGORY_CODE = document.querySelector('#selectCategory')
const KEYWORDS = document.querySelector('#searchKeyword')
const loadPage = document.querySelector('#load')
const load = document.querySelector('#load')
let PAGE= 1;
const PAGE_SIZE = 50;
let loadCounter = 0
let resultCount = 0
let bookmarkPage = []
let totalResults = 0
let bool = 0;
let idSelector = ''
let li = ''
let containerId = 0;

const containers = document.querySelector('.containers')
const results = document.querySelector('.results')
const search = document.querySelector('#btnSearch')

async function getNews(){
    const newsList = await fetch('https://newsapi.org/v2/top-headlines?apiKey=09f3023e7b154f1582dbf07379774e0a&country='+selectCountry.value+'&category='+selectCategory.value+'&q='+searchKeyword.value+'&page='+PAGE+'&pageSize='+PAGE_SIZE+'')   
                        .then(res => res.json())
                        .then(data => data)                        
                        console.log(newsList)
    
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    const { articles , totalResults } = newsList
    li = ''
    bookmarkPage = bookmarkPage.concat(articles)   
    let result =`<p class="h4">You have a total result of ${totalResults}</p>`

        loadCounter = articles.length
        resultCount += articles.length
    articles.forEach(article => {        
        if(bookmarks!=null){
            bookmarks.forEach( bookmark =>{
                if(article.url == bookmark.url){
                    li += `
                        <div class="card-block">
                            <img class="card-img-top" style="height: 250px;" src="${article.urlToImage}" alt="Card image cap">
                            <div class="card-body" style="height:450px;">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.source.name}</p>
                                <p class="card-text">${article.content}</p>
                                <a href="${article.url}" class="card-link">Go to this Page</a>
                                <button style="border: none;"><i class="fa fa-bookmark" id="${containerId}"></i></button>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Published at ${article.publishedAt}</small>
                            </div>
                        </div>
                    `
                    bool = 1
                }
            })
        }
        if(bool==0){
            li += `
            <div class="card-block">
                <img class="card-img-top" style="height: 250px;" src="${article.urlToImage}" alt="Card image cap">
                <div class="card-body" style="height:450px;">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.source.name}</p>
                    <p class="card-text">${article.content}</p>
                    <a href="${article.url}" class="card-link">Go to this Page</a>
                    
                    <button style="border: none; "><i class="fa fa-bookmark-o" id="${containerId}"></i></button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Published at ${article.publishedAt}</small>
                </div>
            </div>
            `
        }
        bool = 0
        containerId++
    })

    loadMoreNews()
    results.innerHTML = result
    containers.innerHTML += li
    console.log(bookmarkPage)
    loader()

}

search.addEventListener("click", e=> {
    console.log("Button Clicked!")
    e.preventDefault()
    bookmarkPage = []
    containerId = 0
    totalResults =0
    containers.innerHTML = ''
    resultCount = 0
    loadCounter = 0
    PAGE = 1
    getNews(e)
})

loadPage.addEventListener("click", e =>{
    load.className = 'load-none'
    PAGE += 1
    loadCounter = 0
    getNews()
})

selectCountry.addEventListener('change', e =>{
    console.log(selectCountry.value)
})

selectCategory.addEventListener('change', e =>{
    console.log(selectCategory.value)
})

searchKeyword.addEventListener('change', e =>{
    console.log(searchKeyword.value)
})

window.onload=function(){
    getNews();
}

// BOOKMARK TOGGLE
containers.addEventListener("click",e=>{
    if(e.target.classList.contains('fa-bookmark-o')){
        e.target.className = 'fa fa-bookmark'
        idSelector = e.target.id
        addBookmark()
    }
    else if(e.target.classList.contains('fa-bookmark')){
        e.target.className = 'fa fa-bookmark-o'
        idSelector = e.target.id
        removeBookmark()
    }
    else{
        console.log(e.target)
    }
})

function addBookmark(){
    
    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = []
        bookmarks.push(bookmarkPage[idSelector])
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        bookmarks.push(bookmarkPage[idSelector])
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }
}

function removeBookmark(){

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
 
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == bookmarkPage[idSelector].url){
            bookmarks.splice(i,1);
        }
    }
    //refresh localStorage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}


function loadMoreNews(){
    if(loadCounter > 49 && resultCount < 100){
        //display Load More Button
        load.className = 'load-page'
    }
    else{
        //Hide Load More Button
        load.className = 'load-none'
    }
}
//function for spinner load
function loader(){
    const spin = document.querySelector('#spinner')
    if(loadCounter == 0){
        spin.className = "spinner-border"
    }
    else{
        spin.className = "spinner-border-none"
    }

}

