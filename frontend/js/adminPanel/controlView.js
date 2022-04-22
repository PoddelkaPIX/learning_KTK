let activePrograms = document.getElementById("activePrograms")
let applications = document.getElementById("applications")
let listenerInformation = document.getElementById("listenerInformation")

let selectedProgram
updatePage()

function updatePage(){
    activePrograms.innerHTML = ""
    applications.innerHTML = ""

    programArray = Send("POST", "/api/getPrograms", null)
    listenerArray =  Send("POST", "/api/getListeners", null)

    for (let program of programArray){
        let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id && (lis.Status == "Learning" || lis.Status == "Learned")){
                listenerCount += 1
            }
        }
        if (program.Status_id != "1"){
            continue
        }
        let prog = Block("div", {
            "className": "programCard",
            "dataset": {"Id": program.Id, "Title": program.Title} ,
            "events": {onclick: openListenerList, oncontextmenu:programCardStatusMenu},
            "children": [
                Block("label", {"textContent": program.Title,}),
                Block("div", {"name": "listenersCount_" + program.Id, "className": "listenerCount", "textContent": listenerCount,}),
                Block("div", { "className": programStatusSelection(program.Status)})
            ]})
        if (prog.dataset.Id == selectedProgram){
            prog.classList.add("selectedProgram")
        }
        activePrograms.append(prog)
    }
    updateApplications()
}

function updateApplications(){
    let awaitingListeners = []
    for (let listener of listenerArray){
        if (listener.Status_id == "1"){
            awaitingListeners.push(Block("div", {
                "dataset": {"Id": listener.Id, "ProgramId": listener.Program_id, "Status": listener.Status_id},
                "className": "listener",
                "events": {oncontextmenu: listenerStatusMenu},
                "children": [
                    Block("label", {
                        "textContent": listener.Surname + " " + listener.Name + " " + listener.Patronymic,
                    }),
                ]
            }))
        }
    }
    for (let program of programArray){
        let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id){
                listenerCount += 1
            }
        }
        let prog = Block("div", {
            "className": "programCard",
            "dataset": {"Id": program.Id, "Title": program.Title} ,
            "events": {onclick: openListenerList, oncontextmenu:programCardStatusMenu},
            "children": [
                Block("label", {"textContent": program.Title,}),
                Block("div", {"name": "listenersCount_" + program.Id, "className": "listenerCount", "textContent": listenerCount,}),
                Block("div", { "className": programStatusSelection(program.Status)})
            ]})
        if (prog.dataset.Id == selectedProgram){
            prog.classList.add("selectedProgram")
        }

        for (let listener of awaitingListeners){
            if (listener.dataset.ProgramId == prog.dataset.Id){
                applications.append(prog)
            }
        }
    }
}

let addProgramButton = document.getElementById("addProgramButton")
addProgramButton.onclick = addProgram

let switchProgramListsButton = document.getElementById("switchProgramListsButton")
switchProgramListsButton.onclick = switchProgramLists

let search = document.querySelector("input[type='search'");
if (search) {
    let timeout = 0;
    search.oninput = function (e) {
        if (timeout !== 0) {
            clearTimeout(timeout);
            timeout = 0;
        }
        timeout = setTimeout(() => {
            let programs = document.querySelectorAll(".programCard")
            for (let program of programs){
                let text = program.firstChild.textContent.toLowerCase()
                if (!text.includes(this.value.toLowerCase())){
                    program.classList.add("hide")
                }else{
                    program.classList.remove("hide")
                }
            }
        }, 400);
    }
}

function openListenerList(){
    selectedProgram = this.dataset.Id
    opportunities.innerHTML = ""
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
    ]})]
    for (let listener of listenerArray){
        if (this.dataset.Id == listener.Program_id){
            let lis = Block("tr", {
                "dataset": {"Id": listener.Id},
                "events": {oncontextmenu: listenerStatusMenu},
                "children": [
                    Block("td", {"children": [Block("input", {"type": "checkbox", "value":  this.dataset.Id, "className": "checkBoxListener"})]}),
                    Block("td", {"textContent": count}),
                    Block("td", {"textContent": listener.Surname}),
                    Block("td", {"textContent": listener.Name}),
                    Block("td", {"textContent": listener.Patronymic}),
                    Block("td", {"textContent": listener.Telephone}),
                    Block("td", {"textContent": listener.Email}),
                    Block("td", {"textContent": listener.Snils}),
                    Block("td", {"textContent": listener.Education}),
                    Block("td", {"textContent": listener.Birth_date}),
                    Block("td", {"textContent": listener.Registration_date})
            ]})
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
            ]}))
        }
    }
    opportunities.append(Block("div", {"id": "listenerList", "children":[
        Block("h2", {"textContent": this.dataset.Title}) , Block("table", {
            "id": "ListenerInformationTable",
            "children": listenersList
        }), Block("div", {
            "id": "listenerButtonsGroup",
            "children": [ 
                Block("input", {"type": "button", "value": "Отчислить"}),
                Block("input", {"type": "button", "value": "Распечатать"}),
        ]}),  Block("input", {"type": "button", "value": "Добавить слушателя", 
                    "dataset": {"Id":  this.dataset.Id, "Title": this.dataset.Title, "Status": "2"}, 
                    "events": {onclick: createRegistrationForm }})
    ]}))
    updatePage()
    checkListenerCheckBox()
    let checkBoxListeners = document.getElementsByClassName("checkBoxListener")
    let checkBox = document.getElementById("selectAllCheckBox")
    for (let box of checkBoxListeners){box.onclick = checkListenerCheckBox}
    checkBox.onclick = function(){for(let box of checkBoxListeners ){ box.checked = checkBox.checked ; checkListenerCheckBox()}}
}

function openProgramPassport(){
    opportunities.innerHTML = ""
    
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
    opportunities.append(Block("div", {
        "id": "passport",
        "children":[
            Block("h2", {"textContent": program.Title}),
            Block("table", {
            "id": "table",
            "children": [...rows]
            })
        ]}
    ))
}

function addProgram(){
    opportunities.innerHTML = ""

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

    opportunities.append(Block("form", {
        "events": {method: "post", action: "/api/addProgram", name: "program"},
        "id": "passport",
        "children":[
            Block("input", {"name": "Title", "required": true}),
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
                        Block("td", {"children": [Block("input", { "name": "Size", "required": true})]})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Длительность программы"}),
                        Block("td", {"children": [Block("input", {"name": "Length", "required": true})]})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Стоимость обучения"}),
                        Block("td", {"children": [Block("input", {"name": "Price", "required": true})]})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Место реализации программы"}),
                        Block("td", {"children": [Block("select", {"name": "Place", "children": placeList})]})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Минимальный размер группы", "required": true}),
                        Block("td", {"children": [Block("input", {"name": "Minimum_group_size"})]})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Начало занятий"}),
                        Block("td", {"children": [Block("input", {"name": "Start_date", "type": "date"})]})
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
            ]}),
            Block("input", {
                "type": "submit",
                "value": "Готово"
            })
        ]}
    ))
    
    let listenersLists = document.querySelectorAll(".listenersList")
    for (let i of listenersLists){
        i.classList.add("hide")
    }
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

function checkListenerCheckBox(){
    let checkBoxListeners = document.getElementsByClassName("checkBoxListener")
    let listenerButtonsGroup = document.getElementById("listenerButtonsGroup")
    checked = false
    for (let box of checkBoxListeners){
        if (box.checked){
            checked = true
            break
        }
    }
    if (checked){
        listenerButtonsGroup.classList.remove("hide")
    }else{  
        listenerButtonsGroup.classList.add("hide")
    }
}