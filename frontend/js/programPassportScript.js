let url = new URL(document.location.href).pathname;

let program = Send("POST", "/api/getProgram/" + url.split("/")[2] , null)

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

document.getElementById("main").append(
    Block("div", {
        "id": "passport",
        "children": [
            CreatePassport(program),
            Block("input", {
                "dataset": {"Title": program.Title, "Id": program.Id, "Status": "1"},
                "id": "subscribe_but",
                "value": "Записаться",
                "type": "button",
                "events": {onclick: createRegistrationForm}
            })
        ]
    })
)