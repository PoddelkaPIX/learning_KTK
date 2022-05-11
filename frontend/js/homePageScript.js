let programs = Send("POST", "/api/getPrograms", null)
let filters = Send("POST", "/api/getParameters", null)

let programCard = document.querySelector("#programList")
let filtersDiv = document.getElementById("filters")
let params = document.getElementById("params")

let LevelOptions = [Block("option", {"value": "0","textContent": "Не важно"})]
let TypeOptions = [Block("option", {"value": "0","textContent": "Не важно"})]
let TrainingFormOptions = [Block("option", {"value": "0","textContent": "Не важно"})]
let PlaceOptions = [Block("option", {"value": "0","textContent": "Не важно"})]
for (let e of filters.Levels){LevelOptions.push(Block("option", {"value": e.Id,"textContent": e.Level}))}
for (let e of filters.Types){TypeOptions.push(Block("option", {"value": e.Id,"textContent": e.Type}))}
for (let e of filters.Training_forms){TrainingFormOptions.push(Block("option", {"value": e.Id,"textContent": e.Reduction}))}
for (let e of filters.Places){PlaceOptions.push(Block("option", {"value": e.Id, "textContent": e.Place}))}

filtersDiv.append( Block("table", {
    "id": "table",
    "children": [
        Block("tr", {"children": [
            Block("td", {"textContent": "Наименование программы"}),
            Block("td", {"textContent": "Уровень программы"}),
            Block("td", {"textContent": "Вид программы"}),
            Block("td", {"textContent": "Форма обучения"}),
            Block("td", {"textContent": "Место реализации"})
        ]}),
        Block("tr", {"children": [
            Block("td", {"children": [Block("input", {"className": "filter", "id": "search", "type": "search"})]}),
            Block("td", {"children": [Block("select", {"className": "filter", "children": LevelOptions,
            "events": {onchange: updateProgramCards}})]}),
            Block("td", {"children": [Block("select", {"className": "filter", "children": TypeOptions, 
            "events": {onchange: updateProgramCards}})]}),
            Block("td", {"children": [Block("select", {"className": "filter", "children": TrainingFormOptions,
            "events": {onchange: updateProgramCards}})]}),
            Block("td", {"children": [Block("select", {"className": "filter", "children": PlaceOptions,
            "events": {onchange: updateProgramCards}})]}),
        ]})
    ]}))
if (programs){
    for (let program of programs){
        if (program.Status == "Open"){
            programCard.append(createProgramCard(program))
        }
    }
}


function createProgramCard(program){
    let programCard = Block("div", {
        "dataset": {"Title": program.Title, "Level": program.Level_id, "Type": program.Type_id, "Training_form": program.Training_form_id, "Place": program.Place_id},
        "className": "Program", "children": [
        Block("div", {"className": "Title", "textContent": "Уровень программы", "style": "grid-area: t_1"}),
        Block("div", {"className": "Title", "textContent": "Вид программы", "style": "grid-area: t_2"}),
        Block("div", {"className": "Title", "textContent": "Наименование программы ", "style": "grid-area: t_3"}),
        Block("div", {"className": "Title","textContent": "Форма обучения", "style": "grid-area: t_4"}),
        Block("div", {"className": "Title","textContent": "Объем программы", "style": "grid-area: t_5"}),
        Block("div", {"className": "Title","textContent": "Стоимость", "style": "grid-area: t_6"}),
        Block("div", {"className": "Title","textContent": "Место реализации", "style": "grid-area: t_7"}),

        Block("div", {"className": "Element", "textContent": program.Level}),
        Block("div", {"className": "Element", "textContent": program.Type}),
        Block("div", {"className": "Element ProgramTitle", "textContent": program.Title, "style": "font-style : italic ; font-weight: bold;"}),
        Block("div", {"className": "Element", "textContent": program.Training_form_reduction}),
        Block("div", {"className": "Element", "textContent": program.Size + " (" + program.Length + ")"}),
        Block("div", {"className": "Element", "textContent": program.Price}),
        Block("div", {"className": "Element", "textContent": program.Place}),

        Block("div", {"className": "buttons_grup",
                        "style": "grid-area: but",
                        "children": [
                            Block("a", {
                                "className": "detailed_but",
                                "textContent": "Подробнее",
                                "events": {href: "/programPassport/" + program.Id}
                            }),
                            Block("input", {
                                "dataset": {"Title": program.Title, "Id": program.Id, "Status": "1"},
                                "className": "subscribe_but",
                                "value": "Записаться",
                                "type": "button",
                                "events": {onclick: createRegistrationForm}
                            })
                        ]})
    ]})
    return programCard
}

function updateProgramCards(){
    let programs = document.getElementsByClassName("Program")
    let filters = document.getElementsByClassName("filter")
    for (let prog of programs){
        if ((prog.dataset.Title.toLowerCase().includes(filters[0].value.toLowerCase()) || filters[0].value == "")&& 
            (prog.dataset.Level == filters[1].value || filters[1].value == "0") && 
            (prog.dataset.Type == filters[2].value || filters[2].value == "0") &&
            (prog.dataset.Training_form == filters[3].value || filters[3].value == "0") &&
            (prog.dataset.Place == filters[4].value || filters[4].value == "0")){
            prog.classList.remove("hide")
        }else{prog.classList.add("hide")}  
    }
}


let search = document.querySelector("#search");
if (search) {
    let timeout = 0;
    search.oninput = function (e) {
        if (timeout !== 0) {
            clearTimeout(timeout);
            timeout = 0;
        }
        timeout = setTimeout(() => {
            updateProgramCards()
        }, 400);
    }
}