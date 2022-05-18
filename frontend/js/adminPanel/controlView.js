let activePrograms = document.getElementById("activePrograms")
let applications = document.getElementById("applications")
let listenerInformation = document.getElementById("listenerInformation")

updatePage()

function updatePage(){
    activePrograms.innerHTML = ""
    applications.innerHTML = ""

    programArray = Send("POST", "/api/getPrograms", null)
    listenerArray =  Send("POST", "/api/getListeners", null)

    for (let program of programArray){
        let prog = createProgramCard(program, "Control")
        
        if (prog){
            if (prog.dataset.Id == selectedProgram){
                prog.classList.add("selectedProgram")
            }
            if (prog.dataset.Status == "Active"){
                activePrograms.append(prog)
            }
        }
    }
    updateApplications()
}

function updateApplications(){
    applications.innerHTML = ""
    let awaitingListeners = []
    for (let listener of listenerArray){
        if (listener.Status == "Waiting"){
            awaitingListeners.push(Block("div", {
                "dataset": {"Id": listener.Id, "ProgramId": listener.Program_id, "Status": listener.Status_id},
                "className": "listener",
                "events": {oncontextmenu: listenerStatusMenu},
                "children": [
                    Block("label", {
                        "textContent": listener.Surname + " " + listener.Name + " " + listener.Patronymic,
                    }),
                ]
            })
        )}
    }

    for (let program of programArray){
        let prog = createProgramCard(program, "Control")

        if (prog.dataset.Id == selectedProgram){
            prog.classList.add("selectedProgram")
        }
        
        for (let listener of awaitingListeners){
            if (listener.dataset.ProgramId == prog.dataset.Id){
                if (prog.dataset.Status == "Open"){
                    applications.append(prog)
                }           
            }
        }
    }
}

document.getElementById("addProgramButton").onclick = addProgram

document.getElementById("switchProgramListsButton").onclick = switchLists

let search = document.getElementById("search");
let timeout = 0;
if (search) {
    search.oninput = updateSearchControl
}
function updateSearchControl(){
    if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
    }
    timeout = setTimeout(() => {
        let programs = document.querySelectorAll(".programCard")
        for (let program of programs){
            let text = program.firstChild.textContent.toLowerCase()
            if (!text.includes(search.value.toLowerCase())){
                program.classList.add("hide")
            }else{
                program.classList.remove("hide")
            }
        }
    }, 400);
}

function addProgram(){
    opportunities.innerHTML = ""
    selectedProgram = ""
    update()

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

    // let failedAlertAddProgram = document.getElementById("failedAlert")

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
            Size: size, 
            Length: length,
            Price: price,
            Place: place,
            Min_grup_size: min_grup_size,
            Start_date: start_date,
            Docum: docum,
            Requirement: requirement,
            Plan: file.files[0].name
        })
        Upload(file.files, (res) => {
            if (res == null){
                update()
            }else{
                text
            }
        });
        deleteForm()
    }else{alert(text)}
}