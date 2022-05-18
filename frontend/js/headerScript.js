let workingInformation = document.querySelector("#workingInformation")
let box_menu = document.querySelector("#box_menu")
workingInformation.onclick = function(){
    if (box_menu.classList.value.includes("hide")){
        box_menu.classList.remove("hide")
    }else{
        box_menu.classList.add("hide")
    }
}

Send("post", "/api/checkAdmin", null, res =>{
    if (!res.login){
        workingInformation.remove()
        box_menu.remove()
        return
    } 
})