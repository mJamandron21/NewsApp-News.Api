const API_KEY = '09f3023e7b154f1582dbf07379774e0a'
const COUNTRY_CODE = document.querySelector('#selectCountry')
const CATEGORY_CODE = document.querySelector('#selectCategory')
const KEYWORDS = document.querySelector('#searchKeyword')
const PAGE= 1;
const PAGE_SIZE = 50;


const containers = document.querySelector('.containers')
const results = document.querySelector('.results')
const search = document.querySelector('#btnSearch')

async function getNews(){
    const newsList = await fetch('https://newsapi.org/v2/top-headlines?apiKey=09f3023e7b154f1582dbf07379774e0a&country='+selectCountry.value+'&category='+selectCategory.value+'&q='+searchKeyword.value+'&page='+PAGE+'&pageSize='+PAGE_SIZE+'')
                        .then(res => res.json())
                        .then(data => data)

                        console.log(newsList)

    const { articles , totalResults } = newsList
    let li = ''
    
    let result =`<p class="h4">You have a total result of ${totalResults}</p>`
    
    articles.forEach(article => {
        li += `
      
        <div class="card-block">
                  <img class="card-img-top" style="height: 250px;" src="${article.urlToImage}" alt="Card image cap">
                  <div class="card-body" style="height:450px;">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.source.name}</p>
                    <p class="card-text">${article.content}</p>
                    <a href="${article.url}" class="card-link">Go to this Page</a>
                    <button style="border: none;"><i class="fa fa-bookmark" aria-hidden="true"></i></button>
                 
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Published at ${article.publishedAt}</small>
                  </div>
        </div>
        
      
        `
    });

    results.innerHTML = result
    containers.innerHTML = li

}



search.addEventListener("click", e=> {
    console.log("Button Clicked!")
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