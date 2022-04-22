let menu_but = document.querySelector("#menu_button")
let box_menu = document.querySelector("#box_menu")
menu_but.onclick = function(){
    if (box_menu.classList.value.includes("hide")){
        box_menu.classList.remove("hide")
    }else{
        box_menu.classList.add("hide")
    }
}

Send("post", "/api/checkAdmin", null, res =>{
    if (!res.login){
        document.querySelector("#menu_button").remove()
        return
    } 
})