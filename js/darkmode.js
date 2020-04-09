const changeTheme = document.querySelector('#switch')

changeTheme.addEventListener("click", e =>{
    if(changeTheme.className == "fa fa-toggle-on"){
        changeTheme.className = "fa fa-toggle-off"
        topNav.className = "darkMode"
    }
    else{
        changeTheme.className = "fa fa-toggle-on"
        topNav.className = "defaultMode"
    }
    e.preventDefault()
})

