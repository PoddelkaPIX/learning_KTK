let programsList = document.getElementById("programsList") 
let listenersList = document.getElementById("listenersList") 
let formsList = document.getElementById("FormsList") 
let windows = document.querySelector("#windows")
let programStatusFilter = document.getElementById("programStatusFilter")
let listenerStatusFilter = document.getElementById("listenerStatusFilter")
programStatusFilter.onchange = fillProgramsList
listenerStatusFilter.onchange = fillListenersList

let warnings = document.getElementById("warnings")
let reacts = document.getElementById("reacts")
let warningCount = document.getElementById("warningCount")
let reactCount = document.getElementById("reactCount")
let firstPoint = document.getElementById("firstPoint")
let lastPoint = document.getElementById("lastPoint")
let search = document.getElementById("search")
search.oninput = searchFilter
firstPoint.onchange = update
lastPoint.onchange = update

let selectedCard = null

let programArray = []
let listenerArray = []

let timeout = 0

document.getElementById("addProgramButton").onclick = addProgram

switchButtons = document.getElementsByName("list")
for (let input of switchButtons){input.onchange = function(){
    programsList.classList.add("hide")
    listenersList.classList.add("hide")
    formsList.classList.add("hide")
    if (this.id == "ProgramsRadio"){
        programsList.classList.remove("hide")
        programStatusFilter.classList.remove("hide")
        listenerStatusFilter.classList.add("hide")
    }else if (this.id == "ListenersRadio"){
        listenersList.classList.remove("hide")
        programStatusFilter.classList.add("hide")
        listenerStatusFilter.classList.remove("hide")
    }
}}

update()

function update(){
    listenerArray =  Send("POST", "/api/getListeners", null)
    programArray = Send("POST", "/api/getPrograms", null)
    fillProgramsList()
    fillListenersList()
    updateAlerts()
}

function fillProgramsList(){
    programsList.innerHTML = ""
    if (!programArray){
        return
    }
    for (let program of programArray){
        let prog = createProgramCard(program)
        if ("Program: " + prog.dataset.Id == selectedCard){
            prog.classList.add("selected")
        }
        if (programStatusFilter.value == prog.dataset.Status || programStatusFilter.value == "-"){
            if (checkingTitleCard(prog) && checkingDateCard(prog)){
                programsList.append(prog)
            }
        }
        if (programStatusFilter.value == "OpenForm" ){
            if (checkingTitleCard(prog) && checkingDateCard(prog)){
                if (prog.getElementsByClassName("listenerCount")[0].textContent != "0" && prog.dataset.Status == "Open"){
                    programsList.append(prog)
                }
            }
        }
    }
}


function fillListenersList(){
    listenersList.innerHTML = ""
    if (!listenerArray){
        return
    }
    for (let listener of listenerArray){
        lis = Block("div", {
            "className": "listener",
            "dataset": {"Listener_Id": listener.Id, "Id": listener.Program_id, "Status": listener.Status_id, "Start_date": listener.Registration_date},
            "events": {onclick: clickOnCard, oncontextmenu: listenerStatusMenu},
            "children": [
                Block("div", {"children": [
                    Block("label", {"textContent": listener.Surname + " " + listener.Name + " " + listener.Patronymic}),
                    Block("div", {"className": "timePeriod", "textContent": listener.Registration_date})
                ]}),
                Block("div", {"style": "border: 3px solid #0b869d;",  "className": "status " + listenerStatusSelection(listener.Status)})
            ]
        })
        if ("Listener: " + lis.dataset.Listener_Id == selectedCard){
            lis.classList.add("selected")
        }
        if (listenerStatusFilter.value == lis.dataset.Status || listenerStatusFilter.value == "-" ){
            if (checkingTitleCard(lis) && checkingDateCard(lis)){
                listenersList.append(lis)
            }
        }
    }
}

function clickOnCard(){
    openListenersListTable(this)
}
function openListenersListTable(card){
    if (card.className == "listener"){
        selectedCard = "Listener: " + card.dataset.Listener_Id
    }else if (card.className == "programCard"){
        selectedCard = "Program: " + card.dataset.Id
    }
    update()
    informations.innerHTML = ""
    let program
    for (let prog of programArray){
        if (card.dataset.Id == prog.Id){
            program = prog
        }
    }
    informations.append(
        createProgramCard(program),
        createListenersTable(card.dataset)
        )
    let checkBoxListeners = document.getElementsByClassName("checkBoxListener")
    let checkBox = document.getElementById("selectAllCheckBox")

    for (let box of checkBoxListeners){box.onclick = checkListenerCheckBox}
    checkBox.onclick = function(){for(let box of checkBoxListeners ){ box.checked = checkBox.checked ; checkListenerCheckBox()}}
}

function createListenersTable(dataset){
    let count = 1
    let listenersListTitles = [Block("tr", {
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
            Block("td", {"textContent": "Дата рождения"}),
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
                "dataset": {"Listener_Id": listener.Id, "Id": listener.Program_id},
                "style": "cursor: pointer;",
                "events": {oncontextmenu: listenerStatusMenu},
                "children": [
                    Block("td", {"children": [Block("input", {"type": "checkbox", "value":  listener.Id, "className": "checkBoxListener"})]}),
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

            listenersListTitles.push(lis)
            count += 1
        }
    }
    if (listenersListTitles.length < 20){
        for (let i; 15 - listenersListTitles.length; i++){
            listenersListTitles.push(Block("tr", {
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
                "children": listenersListTitles
            }), 
            Block("input", {"className": "addButton", "type": "button", "value": "Добавить слушателя", 
                        "dataset": {"Id": dataset.Id, "Title": dataset.Title, "Status": addListenerStatus}, 
                        "events": {onclick: createRegistrationForm }
            }),
            Block("span", { "id": "listenerButtonsGroup",
                "children": [
                    Block("input", {"disabled": true, "type": "button", "value": "Сформировать список в excel", 
                            "dataset": {"Id": dataset.Id, "Title": dataset.Title, "Status": addListenerStatus}, 
                            "events": {onclick: printListersList },
                    }),
            ]})
        ]
    })
    
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

function createProgramCard(program){
    let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id && (lis.Status != "Leaved")){
                listenerCount += 1
            }
        }
    let alert = Block("i",{})
    if (isNumber(program.Minimum_group_size.split(" ")[0]) && program.Status == "Open"){
        let group = parseInt(program.Minimum_group_size.split(" ")[0])
        if (listenerCount == group - 1){
            alert = Block("i", {"className": "fa-solid fa-triangle-exclamation warning", "title": "Нужен ещё один слушатель для полной группы"})
        }else if (listenerCount >= group){
            alert = Block("i", {"className": "fa-solid fa-triangle-exclamation react", "title": "Группа набрана"})
        }
    }
    
    let card =  Block("div", {
            "className": "programCard",
            "dataset": {"Id": program.Id, "Title": program.Title, "Start_date": program.Start_date, 
                        "Time_period": program.Time_period, "Status": program.Status} ,
            "events": {onclick: clickOnCard, oncontextmenu: CardMenu},
            "children": [
                Block("div", {"children": [
                    Block("label", {"textContent": program.Title,}),
                    Block("div", {"className": "timePeriod", "textContent": program.Start_date + " - " + program.Time_period})
                ]}),
                alert,
            Block("div", {"name": "listenersCount_" + program.Id, "className": "listenerCount", "textContent": listenerCount,}),
            Block("div", { "className": "programStatus status " + programStatusSelection(program.Status)})
        ]
    })
    return card
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

function contextMenu(block){
    windows.innerHTML = ""
    windows.append(block)
}

document.body.onclick = function(){
    contextMenu("")
}

function CardMenu(event){
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
                    "dataset": {"Id": this.dataset.Id, "View": this.dataset.View},
                    "type": "button",
                    "value": "Посмотреть паспорт",
                    "events": {onclick: openProgramPassport}
                })
            )
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
                    "events": {onclick: editProgramForm}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "Status": "4"},
                    "type": "button",
                    "value": "Закрыть",
                    "events": {onclick: сhangeStatusProgram}
                }),
            )
            break;
        case "Close":
            buttonsGroup.push(
                    Block("input", {
                        "dataset": {"Id": this.dataset.Id},
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
                )
            break;
        case "Finished":
            buttonsGroup.push(
            Block("input", {
                "dataset": {"Id": this.dataset.Id},
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
        if (lis.Id == this.dataset.Listener_Id){
            listener = lis
        }
    }

    switch (listener.Status) {
        case "Waiting":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm }
                }),
                Block("input", {
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
        case "Active":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
            )
            break;
        case "Learning":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Редактировать",
                    "events": {onclick: editListenerForm}
                }),
                Block("input", {
                    "dataset": {"Id": this.dataset.Id, "Listener_Id": this.dataset.Listener_Id, "Status": "4"},
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
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
        case "Interrupted":
            buttonsGroup.push(
                Block("input", {
                    "dataset": {"Listener_Id": this.dataset.Listener_Id, "Id": this.dataset.Id},
                    "type": "button",
                    "value": "Удалить",
                    "events": {onclick: deleteListener}
                })
            )
            break;
    }
    buttonsGroup.push(
        Block("input", {"value": "Заявление ДПО ПК", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "1"}, 
                "events": {onclick: createStatement},}),
        Block("input", {"value": "Заявление ДПО ПП", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "2"}, 
                "events": {onclick: createStatement},}),
        Block("input", {"value": "Заявление ПО П", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "3"}, 
                "events": {onclick: createStatement},}),
        Block("input", {"value": "Заявление ПО ПК", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "4"}, 
                "events": {onclick: createStatement},}),
        Block("input", {"value": "Заявление ПО ПП", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "5"}, 
                "events": {onclick: createStatement},}),
        Block("input", {"value": "Согласие на обработку ПД", "type": "button",
                "dataset": {"ListenerId": this.dataset.Listener_Id, "ProgramId": this.dataset.Id, "StatementId": "6"}, 
                "events": {onclick: createStatement},
        })
    )
    contextMenu(Block("div", {
        "id": "statusMenu",
        "style": "left:" + String(mouse_x) +"px; top:" + String(mouse_y) +"px;",
        "children": [
            Block("div", {"textContent": this.dataset.Surname}),
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
        openListenersListTable(this)
        update()
    }
}
function сhangeStatusListener(){
    if (confirm('Подтвердить изменение статуса слушателя?')){
        Send("PUT", "/api/changeStatusListener", {Id: this.dataset.Listener_Id, Status: this.dataset.Status})
        openListenersListTable(this)
        update()
    }
}

function deleteListener(){
    if (confirm('Вы уверены, что хоите удалить слушателя?')){
        Send("DELETE", "/api/deleteListener", this.dataset.Listener_Id)
        openListenersListTable(this)
        update()
    }
}

function editProgramForm(){
    document.body.style.overflow = "hidden"
    let program = Send("POST", "/api/getProgram/" + this.dataset.Id, null)
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
            "className": "passport",
            "style": "margin-top: 50px;",
            "children":[
                Block("input", {"className": "hide", "value": res.Id }),
                Block("input", {"name": "Title", "required": true, "placeholder": "Заголовок", "style": "margin:5px; width: 90%", "value": program.Title}),
                Block("table", {
                "id": "table",
                "children": [
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Уровень программы"}),
                            Block("td", {"children": [Block("select", {"name": "Level", "children": levelList, "value": program.Level_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Вид программы"}),
                            Block("td", {"children": [Block("select", {"name": "Type", "children": typeList, "value": program.Type_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Направление обучения"}),
                            Block("td", {"children": [Block("select", {"name": "Direction", "children": directionlList, "value": program.Direction_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Форма обучения"}),
                            Block("td", {"children": [Block("select", {"name": "Forma", "children": formaList, "value": program.Training_form_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Объем программы"}),
                            Block("td", {"children": [Block("input", { "name": "Size", "required": true, "placeholder": "xxx часов", "value": program.Size})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Длительность программы"}),
                            Block("td", {"children": [Block("input", {"name": "Length", "required": true, "placeholder": "x месяцев", "value": program.Length})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Стоимость обучения"}),
                            Block("td", {"children": [Block("input", {"name": "Price", "required": true, "placeholder": "xxx рублей", "value": program.Price})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Место реализации программы"}),
                            Block("td", {"children": [Block("select", {"name": "Place", "children": placeList, "value": program.Place_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Минимальный размер группы"}),
                            Block("td", {"children": [Block("input", {"name": "Minimum_group_size", "required": true, "placeholder": "xx человек", "value": program.Minimum_group_size})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Начало занятий"}),
                            Block("td", {"children": [Block("div", {"textContent": "По мере набора группы"})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Выдаваемый документ"}),
                            Block("td", {"children": [Block("select", {"name": "Document", "children": documentList, "value": program.Issued_document_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Требования к слушателям"}),
                            Block("td", {"children": [Block("select", {"name": "Requirement", "children": requirementList, "value": program.Requirement_id})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Подробнее: "}),
                            Block("td", {"style": "display:flex;", "children": [
                                Block("div", {"textContent": "Хотите изменить файл?"}),
                                Block("input", {"type": "checkbox", "id": "uploadFile", "style": "display: block; opacity: 1;"}),
                                Block("input", {"name": "File", "type": "file", "events": {accept: "application/pdf"}, "disabled": true}),
                        ]})
                    ]}),
                ]}),
                Block("input", {
                    "className": "subscribe_but",
                    "type": "button",
                    "value": "Готово",
                    "dataset": {"ProgramId": program.Id},
                    "events": {onclick: editProgram}
                })
            ]}
        )
    ]})
    document.body.append(forma)
    let file = document.querySelector('[name="File"]')
    let box = document.getElementById("uploadFile")
    box.onchange = function(){
        if (this.checked){
            file.disabled = false
        }else{
            file.disabled = true
        }
    }
}

function editProgram(){
    let program = Send("POST", "/api/getProgram/" + this.dataset.ProgramId, null)
    if (confirm('Подтвердить изменение информации?')){
        let title = document.querySelector('[name="Title"]').value
        let level = document.querySelector('[name="Level"]').value
        let type = document.querySelector('[name="Type"]').value
        let direction = document.querySelector('[name="Direction"]').value
        let forma = document.querySelector('[name="Forma"]').value
        let size = document.querySelector('[name="Size"]').value
        let length = document.querySelector('[name="Length"]').value
        let price = document.querySelector('[name="Price"]').value
        let place = document.querySelector('[name="Place"]').value
        let min_grup_size = document.querySelector('[name="Minimum_group_size"]').value
        let docum = document.querySelector('[name="Document"]').value
        let requirement = document.querySelector('[name="Requirement"]').value
        let file = document.querySelector('[name="File"]')

        let text = ""
    
        if (title == "" || level  == "" || type == "" || direction == "" ||
            forma == "" || size == "" || length == "" || price == "" ||
            place == "" || min_grup_size == "" || docum == "" ||
            requirement == ""){
            text += "Есть пустые поля!"
        }
        let box = document.getElementById("uploadFile")
        let fileName = program.Plan

        if (box.checked && file.value != ""){
            Upload(file.files, (res) => {
                if (res == null){
                    update()
                }else{
                    text += "Не удалось загрузить файл"
                }
            });
            fileName = file.files[0].name
        }
        if (text == ""){
            Send("PUT", "/api/editProgram", {
                Id: program.Id, 
                Title: title, 
                Level: level, 
                Type: type, 
                Direction: direction,
                Forma: forma,
                Size: size, 
                Length: length,
                Price: price,
                Place: place,
                Min_grup_size: min_grup_size,
                Docum: docum,
                Requirement: requirement,
                Plan: fileName
            })
            deleteForm()
            update()
            for (let i of programsList.children){
                if (i.dataset.Id == program.Id){
                    openListenersListTable(i)
                }
            }
        }else{alert(text)}
    }
}

function editListenerForm(){
    document.body.style.overflow = "hidden"
    let listener = Send("POST", "/api/getListener", {Id: this.dataset.Listener_Id})
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
                        "dataset": {"Id": listener.Program_id, "Listener_Id": listener.Id},
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
            Id: this.dataset.Listener_Id, 
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
        openListenersListTable(this)
    }
}

function openProgramPassport(){
    informations.innerHTML = ""
    
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
        "Начало занятий": "По мере набора группы",
        "Выдаваемый документ": program.Issued_document,
        "Требования к слушателям": program.Requirement,
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

    rows.push(Block("tr", {"children":[
        Block("td", {"textContent": "О программе"}),
        Block("td", {"children": [
            Block("a", {"textContent": "Учебный план", "href": "/aboutProgram/"+program.Id})
        ]})
    ]}))
    informations.append(Block("div", {
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

function deleteForm(e){
    if (e) if (e.target.id != "backWall") return;
    document.body.style.overflow = ""
    let forma = document.querySelector("#backWall");
    forma.remove()
}

function addProgram(){
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
                            Block("td", {"children": [Block("input", { "name": "Size", "type": "number", "required": true})]}),
                                  
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Длительность программы"}),
                            Block("td", {"children": [Block("input", {"name": "Length", "type": "number", "required": true})]}),
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Стоимость обучения"}),
                            Block("td", {"children": [Block("input", {"name": "Price", "type": "number", "required": true})]}),
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Место реализации программы"}),
                            Block("td", {"children": [Block("select", {"name": "Place", "children": placeList})]})
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Минимальный размер группы"}),
                            Block("td", {"children": [Block("input", {"name": "Minimum_group_size", "type": "number", "required": true})]}),   
                    ]}),
                    Block("tr", {
                        "children": [
                            Block("td", {"textContent": "Начало занятий"}),
                            Block("td", {"children": [Block("span", {"textContent": "По мере набора группы"})]})
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
                    ]})
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
    let listenersLists = document.querySelectorAll(".listenersList")
    for (let i of listenersLists){
        i.classList.add("hide")
    }
}

function checkAddProgramForm(){
    let title = document.querySelector('[name="Title"]').value
    let level = document.querySelector('[name="Level"]').value
    let type = document.querySelector('[name="Type"]').value
    let direction = document.querySelector('[name="Direction"]').value
    let forma = document.querySelector('[name="Forma"]').value
    let size = document.querySelector('[name="Size"]').value
    let length = document.querySelector('[name="Length"]').value
    let price = document.querySelector('[name="Price"]').value
    let place = document.querySelector('[name="Place"]').value
    let min_grup_size = document.querySelector('[name="Minimum_group_size"]').value
    let start_date = ""
    let docum = document.querySelector('[name="Document"]').value
    let requirement = document.querySelector('[name="Requirement"]').value
    let file = document.querySelector('[name="File"]')

    let text = ""
  
    if (title == "" || level  == "" || type == "" || direction == "" ||
        forma == "" || size == "" || length == "" || price == "" ||
        place == "" || min_grup_size == "" || docum == "" ||
        requirement == "" || file.value == ""){
        text += "Есть пустые поля!"
    }

    if (text == ""){
       let otv = Send("POST", "/api/addProgram", {
            Title: title, 
            Level: level, 
            Type: type, 
            Direction: direction,
            Forma: forma,
            Size: size + " " + getNoun(size, "час", "часа", "часов"), 
            Length: length + " " + getNoun(length, "месяц", "месяца", "месяцев"),
            Price: price + " " + getNoun(length, "рубль", "рубля", "рублей"),
            Place: place,
            Min_grup_size: min_grup_size + " " + getNoun(min_grup_size, "человек", "человека", "человек"),
            Start_date: start_date,
            Docum: docum,
            Requirement: requirement,
            Plan: file.files[0].name
        })
        Upload(file.files, (res) => {
            if (res == null){
                update()
            }else{
                text += "Не удалось загрузить файл"
            }
        });
        deleteForm()
    }else{alert(text)}
}

function checkingTitleCard(card){
    let text = card.firstChild.firstChild.textContent.toLowerCase()
    if (search.value == ""){
        return true
    }else if (text.includes(search.value.toLowerCase())){
        return true
    }else{
        return false
    }
}

function searchFilter(){
    if (timeout !== 0) {
        clearTimeout(timeout)
        timeout = 0;
    }
    timeout = setTimeout(() => {
        update()
    }, 400);
}

function checkingDateCard(card){
    let first = new Date(firstPoint.value).getTime()
    let last = new Date(lastPoint.value).getTime()
    let date = new Date(card.dataset.Start_date).getTime()
    
    if (!first){
        first = 0
    }
    if (!last){
        last = new Date().getTime()
    }
    if(firstPoint.value == "" || lastPoint.value == ""){
        return true
    }else if (first <= date && date <= last){
        return true
    }else{
        return false
    }
}

function ValidRange(date1,date2)
{
   return date2 > date1;
}

function checkListenerCheckBox(){
    let checkBox = document.getElementById("selectAllCheckBox")
    let checkBoxListeners = document.getElementsByClassName("checkBoxListener")
    for (let box of checkBoxListeners){box.onclick = checkListenerCheckBox}
    checkBox.onclick = function(){for(let box of checkBoxListeners ){ box.checked = checkBox.checked ; checkListenerCheckBox()}}
    checked = false
    for (let box of checkBoxListeners){
        if (box.checked){
            checked = true
            break
        }
    }
    let listenerButtonsGroup = document.getElementById("listenerButtonsGroup")
    if (checked){
       for (let item of listenerButtonsGroup.children){
           item.disabled = false
       }
    }else{  
        for (let item of listenerButtonsGroup.children){
            item.disabled = true
        }
    }
}


function printListersList(){
    idListeners = []
    checkBoxListeners = document.getElementsByClassName("checkBoxListener")
    for (let box of checkBoxListeners){
        if (box.checked){
            idListeners.push(box.value)
        }
    }
    idListeners = idListeners.join(";")
    let otv = Send("POST", "/api/excelList", idListeners)
    if (otv){
        window.location.href = "/excel"
    }
    // setTimeout(() => {window.location.href = "/excel"}, 1000);
}

function updateAlerts(){
    warningCount.innerHTML = "0"
    reactCount.innerHTML = "0"
    for (let prog of programsList.children){
        if (prog.querySelector("i").classList.contains("warning")){
            warningCount.textContent = parseInt(warningCount.textContent) + 1
        }else if (prog.querySelector("i").classList.contains("react")){
            reactCount.textContent = parseInt(reactCount.textContent) + 1
        }
    }
    if (warningCount.textContent  == "0"){
        warnings.classList.add("hide")
    }else{
        warnings.classList.remove("hide")
    }
    if (reactCount.textContent  == "0"){
        reacts.classList.add("hide")
    }else{
        reacts.classList.remove("hide")
    }
}


function checkFields(){
    let regexTelephone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    let regexEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    let surname = document.getElementById("surname").value
    let name = document.getElementById("name").value
    let patronymic = document.getElementById("patronymic").value
    let birth_date = document.getElementById("birth_date").value
    let snils = document.getElementById("snils").value
    let email = document.getElementById("email").value
    let telephone = document.getElementById("telephone").value
    let education = document.getElementById("education").value

    let failedAlert = document.getElementById("failedAlert")

    let text = ""

    if (typeof snils === 'number') {
		snils = snils.toString();
	} else if (typeof snils !== 'string') {
		snils = '';
	}
  
    if (surname == "" || name  == "" || patronymic == "" || birth_date == "" ||
        snils == "" || email == "" || telephone == "" || education == ""){
        text += "Есть пустые поля!"
    }else if (/[^0-9]/.test(snils)) {
        text += 'СНИЛС может состоять только из цифр';
	}else if (snils.length !== 11) {
        text += 'СНИЛС может состоять только из 11 цифр';
	}else if(!regexEmail.test(email)){
        text += 'Не верно указана почта!';
    }else if(!regexTelephone.test(telephone)){
        text += 'Не верно указан номер телефона!';
    }

    failedAlert.innerHTML = text + "<br>"
    if (text == ""){
        Send("POST", "/api/AddListener", {
            Surname: surname, 
            Name: name, 
            Patronymic: patronymic, 
            Telephone: telephone,
            Email: email,
            Snils: snils, 
            Education: education,
            Birth_date: birth_date,
            Status: this.dataset.Status,
            Program: this.dataset.Id
        })
        deleteRegistrationForm()
    }
    update()
    openListenersListTable(this)
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

function createStatement(){
    let otv = Send("POST", "/api/createStatement", {
        ProgramId: this.dataset.ProgramId, 
        ListenerId: this.dataset.ListenerId,
        StatementId: this.dataset.StatementId})
        console.log(otv);
    if (otv){
        window.location.href = "/downloadStatement/" + otv
    }
}