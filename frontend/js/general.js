function Send(method, uri, data) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, uri, false);
    let res

    xhr.onload = function (event) {
        res = JSON.parse(this.response)
    }

    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    return res
}

function Block(block, props) {
    let bl = document.createElement(block);

    if (!props || typeof props !== "object") {
        return bl;
    }
    if ("events" in props) {
        for (let key in props.events) {
            bl[key] = props.events[key];
        }
    }
    if ("className" in props) {
        bl.className = props.className;
    }
    if ("name" in props) {
        bl.name = props.name;
    }
    if ("style" in props) {
        bl.style.cssText = props.style;
    }
    if ("type" in props) {
        bl.setAttribute('type', props.type)
    }
    if ("id" in props) {
        bl.id = props.id;
    }
    if ("dataset" in props) {
        for (let key in props.dataset) {
            bl.dataset[key] = props.dataset[key];
        }
    }
    if ("children" in props) {
        bl.append(...props.children);
    }
    if ("value" in props) {
        bl.value = props.value;
    }
    if ("textContent" in props) {
        bl.textContent = props.textContent;
    }
    if ("required" in props) {
        bl.required = props.required;
    }
    if ("placeholder" in props) {
        bl.placeholder = props.placeholder;
    }
    if ("pattern" in props) {
        bl.pattern = props.pattern;
    }
    if ("maxlength" in props) {
        bl.maxlength = props.maxlength;
    }
    if ("minlength" in props) {
        bl.minlength = props.minlength;
    }
    if ("href" in props) {
        bl.href = props.href;
    }
    if ("disabled" in props) {
        bl.disabled = props.disabled;
    }
    if ("title" in props) {
        bl.title = props.title;
    }
    
    return bl;
}

function Upload(files, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    let data = new FormData();
    
    for (let file of files) {
        data.append("MyFiles", file, file.name);
    }
    xhr.onload = function (event) {
        callback(JSON.parse(this.response));
    }
    xhr.send(data);
}

function CreatePassport(program){
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
    let planLink
    
    if (program.Plan == ""){
        planLink = Block("a", {"textContent": "Дополнительная информация отсутствует"})
    }else{
        planLink = Block("a", {"textContent": "Учебный план", "href": "/aboutProgram/"+program.Id})
    }
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
            planLink
        ]})
    ]}))
    return Block("div", {
        "className": "passport",
        "children":[
            Block("h2", {"textContent": program.Title}),
            Block("table", {
            "id": "table",
            "children": [...rows]
            })
        ]
    })
}