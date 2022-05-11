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

let selectedProgram
let selectedCardArc

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

function switchLists(){
    let Lists = document.getElementById(this.dataset.listid)
    if (this.dataset.listid == "lists"){
        let box = document.getElementById('controlCheckbox')
        let title = document.getElementById("switchListsTitleControlButton")
        if (box.checked){
            title.textContent = "Программы"
        }else{
            title.textContent = "Заявки"
        }
        search.value = ""
        updateSearchControl()
    }else{
        let box = document.getElementById('archiveCheckbox')
        let title = document.getElementById("switchListsTitleArchiveButton")
        if (box.checked){
            title.textContent = "Программы"
        }else{
            title.textContent = "Слушатели"
        }
        startDate.value = null
        finishDate.value = null
        searchArc.value = ""
        updateSearchArc()
    }
    for (let input of Lists.children){
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

function deleteForm(e){
    if (e) if (e.target.id != "backWall") return;
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
                "dataset": {"Id": this.dataset.Id, "Status": "3", "View": this.dataset.View},
                "type": "button",
                "value": "Закончить",
                "events": {onclick: сhangeStatusProgram}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Редактировать",
                "events": {onclick: editProgramForm}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id, "View": this.dataset.View},
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
                "dataset": {"Id": this.dataset.Id, "View": this.dataset.View},
                "type": "button",
                "value": "Посмотреть пасспорт",
                "events": {onclick: openProgramPassport}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Редактировать",
                "events": {onclick: editProgramForm}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id, "Status": "4"},
                "type": "button",
                "value": "Закрыть",
                "events": {onclick: сhangeStatusProgram}
            }),
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
                "type": "button",
                "value": "Удалить",
                "events": {onclick: deleteProgram}
            }))
            break;
        case "Close":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "View": this.dataset.View},
                    "type": "button",
                    "value": "Посмотреть пасспорт",
                    "events": {onclick: openProgramPassport}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "Status": "2"},
                    "type": "button",
                    "value": "Открыть",
                    "events": {onclick: сhangeStatusProgram}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteProgram}
                }))
            break;
        case "Finished":
            buttonsGroup.push(
            Block("input", {
                "dataset": {"Id": this.dataset.Id, "View": this.dataset.View},
                "type": "button",
                "value": "Посмотреть пасспорт",
                "events": {onclick: openProgramPassport}
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
    let mouse_x = 0
    let mouse_y = 0
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
        if (lis.Id == this.dataset.ListenerId){
            listener = lis
        }
    }

    console.log(listener.Status);
    switch (listener.Status) {
        case "Waiting":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm }
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
        case "Active":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
            )
            break;
        case "Learning":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId, "Status": "4"},
                    "type": "button",
                    "value": "Отчислить",
                    "events": {onclick: сhangeStatusListener}
                })
            )
            break;
        case "Learned":
            
            break;
        case "Leaved":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
        case "Interrupted":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Id": this.dataset.ListenerId},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
    }

    contextMenu(Block("div", {
        "id": "statusMenu",
        "style": "left:" + String(mouse_x) +"px; top:" + String(mouse_y) +"px;",
        "children": [
            Block("div", {"textContent": "Id: " + this.dataset.ListenerId}),
            ...buttonsGroup
        ]
    }))
    return false // Нужно чтобы не появлялось стандартное меню браузера
}

function programStatusSelection(status){
    if (status == "Open"){
        return "statusOpen"
    }else if (status == "Close"){
        return "statusClose" 
    }else if (status == "Active"){
        return "statusActive"
    }else if (status == "Finished"){
        return "statusFinished"
    }
}

function listenerStatusSelection(status){
    if (status == "Waiting"){
        return "statusWaiting"
    }else if (status == "Learning"){
        return "statusLearning" 
    }else if (status == "Learned"){
        return "statusLearned"
    }else if (status == "Leaved"){
        return "statusLeaved"
    }else if (status == "Interrupted"){
        return "statusInterrupted"
    }
}

function сhangeStatusProgram(){
    if (confirm('Подтвердить изменение статуса программы?')){
        Send("PUT", "/api/changeStatusProgram", {Id: this.dataset.Id, Status: this.dataset.Status})
        update()
    }
}
function сhangeStatusListener(){
    if (confirm('Подтвердить изменение статуса слушателя?')){
        Send("PUT", "/api/changeStatusListener", {Id: this.dataset.Id, Status: this.dataset.Status})
        update()
        openListenersList()
    }
}

function deleteProgram(){
    if (confirm('Вы уверены, что хоите удалить программу?')){
        Send("DELETE", "/api/deleteProgram", this.dataset.Id)
        update()
    }
}

function deleteListener(){
    if (confirm('Вы уверены, что хоите удалить слушателя?')){
        Send("DELETE", "/api/deleteListener", this.dataset.Id)
        update()
    }
}

function editProgramForm(){
    document.body.style.overflow = "hidden"
    let res = Send("POST", "/api/getParameters", null)
    let levelList = []
    let typeList = []
    let directionlList = []
    let formaList = []
    let placeList = []
    let documentList = []
    let requirementList = []

    for (let level of res.Levels){levelList.push(Block("option", {"value": level.Id, "textContent": level.Level}))}
    for (let type of res.Types){typeList.push(Block("option", {"value": type.Id, "textContent": type.Type}))}
    for (let direction of res.Directions){directionlList.push(Block("option", {"value": direction.Id, "textContent": direction.Direction}))}
    for (let forma of res.Training_forms){formaList.push(Block("option", {"value": forma.Id, "textContent": forma.Reduction}))}
    for (let place of res.Places){placeList.push(Block("option", {"value": place.Id, "textContent": place.Place}))}
    for (let document of res.Documents){documentList.push(Block("option", {"value": document.Id, "textContent": document.Document}))}
    for (let requirement of res.Requirements){requirementList.push(Block("option", {"value": requirement.Id, "textContent": requirement.Reduction}))}

    forma = Block("div", {
        "id": "backWall",
        "events": {onclick: deleteForm},
        "children": [
            Block("form", {
            "events": {method: "post", action: "/api/addProgram", name: "program"},
            "className": "passport",
            "style": "margin-top: 50px;",
            "children":[
                Block("input", {"className": "hide", "value": res.Id }),
                Block("input", {"name": "Title", "required": true, "placeholder": "Заголовок", "style": "margin:5px; width: 90%"}),
                Block("table", {
                "id": "table",
                "children": [
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Уровень программы"}),
                            Block("td", {"children": [Block("select", {"name": "Level", "children": levelList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Вид программы"}),
                            Block("td", {"children": [Block("select", {"name": "Type", "children": typeList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Направление обучения"}),
                            Block("td", {"children": [Block("select", {"name": "Direction", "children": directionlList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Форма обучения"}),
                            Block("td", {"children": [Block("select", {"name": "Forma", "children": formaList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Объем программы"}),
                            Block("td", {"children": [Block("input", { "name": "Size", "required": true, "placeholder": "xxx часов"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Длительность программы"}),
                            Block("td", {"children": [Block("input", {"name": "Length", "required": true, "placeholder": "x месяцев"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Стоимость обучения"}),
                            Block("td", {"children": [Block("input", {"name": "Price", "required": true, "placeholder": "xxx рублей"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Место реализации программы"}),
                            Block("td", {"children": [Block("select", {"name": "Place", "children": placeList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Минимальный размер группы"}),
                            Block("td", {"children": [Block("input", {"name": "Minimum_group_size", "required": true, "placeholder": "xx человек"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Начало занятий"}),
                            Block("td", {"children": [Block("input", {"name": "Start_date", "type": "date"}), Block("span", {"textContent": "  (Не обязательно)"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Выдаваемый документ"}),
                            Block("td", {"children": [Block("select", {"name": "Document", "children": documentList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Требования к слушателям"}),
                            Block("td", {"children": [Block("select", {"name": "Requirement", "children": requirementList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Подробнее: "}),
                            Block("td", {"children": [Block("input", {"name": "File", "type": "file", "events": {accept: "application/pdf"}})]})
                    ]}),
                ]}),
                Block("input", {
                    "className": "subscribe_but",
                    "type": "button",
                    "value": "Готово",
                    "events": {onclick: checkAddProgramForm}
                })
            ]}
        )
    ]})
    document.body.append(forma)
}

function editProgram(){
    if (confirm('Подтвердить изменение информации?')){
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
        update()
    }
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
        "events": {onclick: deleteForm},
        "children": [
            Block("div", {
                "id": "editListener",
                "children": [
                    Block("input", {"className": "hide", "value": listener.Id }),
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
    if (confirm('Подтвердить изменение информации?')){
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
        update()
    }
}

function openProgramPassport(){
    let view
    if (this.dataset.View == "control"){
        view = opportunities
    }else{
        view = informations
    }
    view.innerHTML = ""
    
    let program = Send("POST", "/api/getProgram/" + this.dataset.Id , null)
    let params = {
        "Уровень программы": program.Level, 
        "Вид программы": program.Type,
        "Направление обучения": program.Direction, 
        "Форма обучения": program.Training_form,
        "Объем программы": program.Size, 
        "Длительность программы": program.Length,
        "Стоимость обучения": program.Price, 
        "Место реализации программы": program.Place,
        "Минимальный размер группы": program.Minimum_group_size, 
        "Начало занятий": program.Start_date,
        "Выдаваемый документ": program.Issued_document,
        "Требования к слушателям": program.Requirement,
        "О программе": ""
    }
    let rows = []

    for ( let i in params){
        rows.push(Block("tr", {
                    "children": [
                        Block("td", {"textContent": i}),
                        Block("td", {"textContent": params[i]})
                    ]}
                ))
    }
    view.append(Block("div", {
        "className": "passport",
        "children":[
            Block("h2", {"textContent": program.Title}),
            Block("table", {
            "id": "table",
            "children": [...rows]
            })
        ]
    }))
}

function openListenersList(){
    let view

    if (this.dataset.View == "Control"){
        selectedProgram = this.dataset.Id
        view = opportunities
    }else{
        selectedCardArc = "Program: " + this.dataset.Id
        view = informations
    }
    view.innerHTML = ""
    
    view.append(
        Block("div", {"children": [
            Block("div", {"style": "display:flex;","children": [
                Block("div", {"className": "programTitleName", "textContent": this.dataset.Title}),
                Block("div", {"className": "titleStatusProgram " + programStatusSelection(this.dataset.Status), "textContent": this.dataset.Status}),
            ]}),
            Block("span", {"className": "programTitleDate", "textContent": this.dataset.startDate + " - " + this.dataset.finishDate}), 
        ]}),
        createListenersTable(this.dataset)
        )
    // checkListenerCheckBox(view.id)
    update()
}

function createListenersTable(dataset){
    let count = 1
    let listenersList = [Block("tr", {
        "children": [
            Block("td", {"children": [Block("input", {"type": "checkbox", "id": "selectAllCheckBox"})]}),
            Block("td", {"textContent": "№"}),
            Block("td", {"textContent": "Фамилия"}),
            Block("td", {"textContent": "Имя"}),
            Block("td", {"textContent": "Отчество"}),
            Block("td", {"textContent": "Телефон"}),
            Block("td", {"textContent": "Почта"}),
            Block("td", {"textContent": "Снилc"}),
            Block("td", {"textContent": "Образование"}),
            Block("td", {"textContent": "День рождения"}),
            Block("td", {"textContent": "Дата подачи заявления"})
        ]
    })]

    for (let listener of listenerArray){
        let style 
        if (listener.Status == "Waiting"){
            style = "border-right: 4px solid; border-color: white;"
        }else if (listener.Status == "Learning"){
            style = "border-right: 4px solid; border-color: #0b869d;"
        }else if (listener.Status == "Learned"){
            style = "border-right: 4px solid; border-color: green;"
        }else if (listener.Status == "Leaved"){
            style = "border-right: 4px solid; border-color: red;"
        }else if (listener.Status == "Interrupted"){
            style = "border-right: 4px solid; border-color: yellow;"
        }
        
        if (dataset.Id == listener.Program_id){
            let lis = Block("tr", {
                "dataset": {"ListenerId": listener.Id},
                "style": "cursor: pointer;",
                "events": {oncontextmenu: listenerStatusMenu},
                "children": [
                    Block("td", {"children": [Block("input", {"type": "checkbox", "value":  dataset.Id, "className": "checkBoxListener"})]}),
                    Block("td", {"textContent": count}),
                    Block("td", {"textContent": listener.Surname}),
                    Block("td", {"textContent": listener.Name}),
                    Block("td", {"textContent": listener.Patronymic}),
                    Block("td", {"textContent": listener.Telephone}),
                    Block("td", {"textContent": listener.Email}),
                    Block("td", {"textContent": listener.Snils}),
                    Block("td", {"textContent": listener.Education}),
                    Block("td", {"textContent": listener.Birth_date}),
                    Block("td", {"textContent": listener.Registration_date, "style": style})
                ]
            })
            if (listener.Status == "Leaved"){
                lis.classList.add("leaved")
            }
            listenersList.push(lis)
            count += 1
        }
    }
    if (listenersList.length < 20){
        for (let i; 15 - listenersList.length; i++){
            listenersList.push(Block("tr", {
                "children": [
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {}),
                    Block("td", {})
                ]
            }))
        }
    }
    let addListenerStatus 

    if (dataset.Status == "Active"){
        addListenerStatus = "2"
    }else if (dataset.Status == "Open"){
        addListenerStatus = "1"
    }else if (dataset.Status == "Finished"){
        addListenerStatus = "3"
    }else if (dataset.Status == "Close"){
        addListenerStatus = "5"
    }

    return Block("div", {"className": "listenerList", "children":[
        Block("table", {
            "id": "ListenerInformationTable",
            "children": listenersList
        }), 
        Block("div", {
            "id": "listenerButtonsGroup",
            // "children": [ 
            //     Block("input", {"id": "printButton", "type": "button", "value": "Распечатать"}),
            // ]
        }), 
        Block("input", {"id": "addButton", "type": "button", "value": "Добавить слушателя", 
                    "dataset": {"Id":  dataset.Id, "Title": dataset.Title, "Status": addListenerStatus}, 
                    "events": {onclick: createRegistrationForm }})
        ]
    })
}

function createProgramCard(program, view){
    let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id && (lis.Status != "Leaved")){
                listenerCount += 1
            }
        }

    let card =  Block("div", {
        "className": "programCard",
        "dataset": {"Id": program.Id, "Title": program.Title, "startDate": program.Start_date, 
                    "finishDate": program.Time_period, "Status": program.Status, "View": view} ,
        "events": {onclick: openListenersList, oncontextmenu:programCardStatusMenu},
        "children": [
            Block("div", {"children": [
                Block("label", {"textContent": program.Title,}),
                Block("div", {"className": "timePeriod", "textContent": program.Start_date + " - " + program.Time_period})
            ]}),
            Block("div", {"name": "listenersCount_" + program.Id, "className": "listenerCount", "textContent": listenerCount,}),
            Block("div", { "className": "programStatus status " + programStatusSelection(program.Status)})
        ]
    })
    return card
}

// function checkListenerCheckBox(view){
//     let checkBox = document.getElementById("selectAllCheckBox")
//     for (let box of checkBoxListeners){box.onclick = checkListenerCheckBox}
//     checkBox.onclick = function(){for(let box of checkBoxListeners ){ box.checked = checkBox.checked ; checkListenerCheckBox()}}
//     let checkBoxListeners = document.getElementsByClassName("checkBoxListener")
//     let listenerButtonsGroup = document.getElementById("listenerButtonsGroup")
//     checked = false
//     for (let box of checkBoxListeners){
//         if (box.checked){
//             checked = true
//             break
//         }
//     }
//     if (checked){
//         listenerButtonsGroup.classList.remove("hide")
//     }else{  
//         listenerButtonsGroup.classList.add("hide")
//     }
// }

function update(){
    updatePage()
    updateArchive()
    updateApplications()
}