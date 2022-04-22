let controlPanelView = document.getElementById("controlPanelView")
let archiveView = document.getElementById("archiveView")

let windows = document.querySelector("#windows")

let allProgramsList = document.getElementById("allProgramsList")
let allListenersList = document.getElementById("allListenersList")
let startDate = document.getElementById("startDate")
let finishDate = document.getElementById("finishDate")

let programArray = []
let listenerArray =  []
let programCards = []

window.addEventListener('scroll', function() {
    contextMenu("")
});
document.body.onclick = function(){
    contextMenu("")
}

radioSwitchViews = document.getElementsByName("select")
for (let i of radioSwitchViews){
    i.onclick = switchView
}

function switchView(){
    if (this.id == "controlView_input"){
        controlPanelView.classList.remove("hide")
        archiveView.classList.add("hide")
    }else if (this.id == "libraryView_input") {
        controlPanelView.classList.add("hide")
        archiveView.classList.remove("hide")
    }
}

function switchProgramLists(){
    let interactionProgramList = document.getElementById("lists")
    for (let input of interactionProgramList.children){
        if (input.classList.contains("hide")){
            input.classList.remove("hide")
        }else{
            input.classList.add("hide")
        }
    }
}


function contextMenu(block){
    windows.innerHTML = ""
    windows.append(block)
}

function deleteForm(){
    document.body.style.overflow = ""
    let forma = document.querySelector("#backWall");
    forma.remove()
}

function programCardStatusMenu(event){
    var mouse_x = 0
    var mouse_y = 0
    if (document.attachEvent != null) {
        mouse_x = window.event.clientX;
        mouse_y = window.event.clientY;
    } else if (!document.attachEvent && document.addEventListener) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }

    let program
    let buttonsGroup = []

    for (let prog of programArray){
        if (prog.Id == this.dataset.Id){
            program = prog
        }
    }
 
    switch (program.Status) {
        case "Active":
            buttonsGroup.push(Block("input", {
                "dataset": {"Id": this.dataset.Id, "Status": "3"},
                "type": "button",
                "value": "Закончить",
                "events": {onclick: сhangeStatusProgram}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Посмотреть пасспорт",
                "events": {onclick: openProgramPassport}
            }))
            break;
        case "Open":
            buttonsGroup.push(
            Block("input", {
                "dataset": {"Id": this.dataset.Id, "Status": "1"},
                "type": "button",
                "value": "Начать",
                "events": {onclick: сhangeStatusProgram}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Посмотреть пасспорт",
                "events": {onclick: openProgramPassport}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Редактировать",
                "style": "background-color: red; color: white;"
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id, "Status": "4"},
                "type": "button",
                "value": "Закрыть",
                "events": {onclick: сhangeStatusProgram}
            }))
            break;
        case "Close":
            buttonsGroup.push(Block("input", {
                "dataset": {"Id": this.dataset.Id, "Status": "3"},
                "type": "button",
                "value": "Открыть",
                "events": {onclick: сhangeStatusProgram}
            }))
            break;
        case "Finished":
            buttonsGroup.push(Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Удалить",
                "style": "background-color: red; color: white;"
            }))
            break;
    }

    contextMenu(Block("div", {
        "id": "statusMenu",
        "style": "left:" + String(mouse_x) +"px; top:" + String(mouse_y) +"px;",
        "children": [
            Block("div", {"textContent": "Id: " + this.dataset.Id}),
            ...buttonsGroup
        ]
    }))
    return false // Нужно чтобы не появлялось стандартное меню браузера
}

function listenerStatusMenu(event){
    var mouse_x = mouse_y = 0;
    if (document.attachEvent != null) {
        mouse_x = window.event.clientX;
        mouse_y = window.event.clientY;
    } else if (!document.attachEvent && document.addEventListener) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }

    let listener
    let buttonsGroup = []

    for (let lis of listenerArray){
        if (lis.Id == this.dataset.Id){
            listener = lis
        }
    }

    switch (listener.Status) {
        case "Waiting":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm }
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
        case "Active":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
            )
            break;
        case "Learning":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "Status": "4"},
                    "type": "button",
                    "value": "Отстранить",
                    "events": {onclick: сhangeStatusListener}
                })
            )
            break;
        case "Learned":
            
            break;
        case "Leaved":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "Status": "2"},
                    "type": "button",
                    "value": "Востановить на учёбу",
                    "events": {onclick: сhangeStatusListener}
                })
            )
            break;
    }

    contextMenu(Block("div", {
        "id": "statusMenu",
        "style": "left:" + String(mouse_x) +"px; top:" + String(mouse_y) +"px;",
        "children": [
            Block("div", {"textContent": "Id: " + this.dataset.Id}),
            ...buttonsGroup
        ]
    }))
    return false // Нужно чтобы не появлялось стандартное меню браузера
}

function programStatusSelection(status){
    if (status == "Open"){
        return "programStatus statusOpen"
    }else if (status == "Close"){
        return "programStatus statusClose" 
    }else if (status == "Active"){
        return "programStatus statusActive"
    }else if (status == "Finished"){
        return "programStatus statusFinished"
    }
}

function listenerStatusSelection(status){
    if (status == "Open"){
        return "programStatus statusOpen"
    }else if (status == "Close"){
        return "programStatus statusClose" 
    }else if (status == "Active"){
        return "programStatus statusActive"
    }else if (status == "Finished"){
        return "programStatus statusFinished"
    }
}

function сhangeStatusProgram(){
    Send("PUT", "/api/changeStatusProgram", {Id: this.dataset.Id, Status: this.dataset.Status})
    updatePage()
}
function сhangeStatusListener(){
    Send("PUT", "/api/changeStatusListener", {Id: this.dataset.Id, Status: this.dataset.Status})
    updatePage()
}

function deleteListener(){
    Send("DELETE", "/api/deleteListener", this.dataset.Id)
    updatePage()
}

function editListenerForm(){
    document.body.style.overflow = "hidden"
    let listener = Send("POST", "/api/getListener", {Id: this.dataset.Id})
    let educations = Send("POST", "/api/getEducations", null)
    let educationList = []
    for (let edu of educations){    
        educationList.push(Block("option", {"textContent": edu}))
    }
    forma = Block("div", {
        "id": "backWall",
        "children": [
            Block("div", {
                "id": "editListener",
                "children": [
                    Block("input", {"className": "hide", "value": listener.Id }),
                    Block("i", {
                        "className": "fas fa-xmark",
                        "events": {onclick: deleteForm}
                    }),
                    Block("input", {"value": listener.Surname, "placeholder": listener.Surname, "id": "surname"}),
                    Block("input", {"value": listener.Name, "placeholder": listener.Name, "id": "name"}),
                    Block("input", {"value": listener.Patronymic, "placeholder": listener.Patronymic, "id": "patronymic"}),
                    Block("input", {"value": listener.Telephone, "placeholder": listener.Telephone, "id": "telephone"}),
                    Block("input", {"value": listener.Email, "placeholder": listener.Email, "id": "email"}),
                    Block("input", {"value": listener.Snils, "placeholder": listener.Snils, "id": "snils"}),
                    Block("select", {"children": [...educationList], "value": listener.Education, "id": "education"}),
                    Block("input", {"type": "date", "value": listener.Birth_date, "id": "birth_date"}),
                    Block("input", {
                        "type": "button", 
                        "value": "Изменить", 
                        "id": "edit_but",
                        "dataset": {"Id": this.dataset.Id},
                        "events": {onclick: editListener}
                    })
                ]
            })
        ]
    }) 
    document.body.append(forma)
}

function editListener(){
    let surname = document.querySelector("#editListener #surname").value
    let name = document.querySelector("#editListener #name").value
    let patronymic = document.querySelector("#editListener #patronymic").value
    let telephone = document.querySelector("#editListener #telephone").value
    let email = document.querySelector("#editListener #email").value
    let snils = document.querySelector("#editListener #snils").value
    let education = document.querySelector("#editListener #education").value
    let birth_date = document.querySelector("#editListener #birth_date").value
    deleteForm()
    Send("PUT", "/api/editListener", {
        Id: this.dataset.Id, 
        Surname: surname, 
        Name: name, 
        Patronymic: patronymic, 
        Telephone: telephone, 
        Email: email,
        Snils: snils,
        Education: education,
        Birth_date: birth_date
    })
    updatePage()
}