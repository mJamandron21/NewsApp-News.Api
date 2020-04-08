const containers = document.querySelector('.containers')
const results = document.querySelector('.results')
let bookmarkPage = []
let idSelector = 0
let containerId = 0


function fetchBookmark(){

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        let li = ''
        bookmarkPage = bookmarks
        bookmarks.forEach(bookmark => {
            li += `   
                <div class="card-block">
                    <img class="card-img-top" style="height: 250px;" src="${bookmark.urlToImage}" alt="Card image cap">
                    <div class="card-body" style="height:450px;">
                        <h5 class="card-title">${bookmark.title}</h5>
                        <p class="card-text">${bookmark.source.name}</p>
                        <p class="card-text">${bookmark.content}</p>
                        <a href="${bookmark.url}" class="card-link">Go to this Page</a>
                        <button style="border: none;"><i class="fa fa-bookmark" id="${containerId}"></i></button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Published at ${bookmark.publishedAt}</small>
                    </div>
                </div>
            `
            containerId++
        })
    containers.innerHTML = li
}
fetchBookmark()

containers.addEventListener("click",e=>{
    
    if(e.target.classList.contains('fa-bookmark')){
        e.target.className = 'fa fa-bookmark-o'
        idSelector = e.target.id
        removeBookmark()
        containerId=0
        fetchBookmark()
    }
})

function removeBookmark(){
    
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        bookmarkPage = bookmarks
        for(var i = 0; i< bookmarks.length; i++){
            if(bookmarks[i] == bookmarkPage[idSelector]){
                bookmarks.splice(i,1);
            }
        }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}