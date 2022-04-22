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

document.body.append(
    Block("div", {
        "id": "passport",
        "children": [
            Block("h2", {"textContent": program.Title}),
            Block("table", {
            "id": "table",
            "children": [
                Block("tr", {
                "children": [
                    Block("td", {"textContent": "Уровень программы"}),
                    Block("td", {"textContent": program.Level})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Вид программы"}),
                        Block("td", {"textContent": program.Type})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Направление обучения"}),
                        Block("td", {"textContent": program.Direction})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Форма обучения"}),
                        Block("td", {"textContent": program.Training_form})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Объем программы"}),
                        Block("td", {"textContent": program.Size})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Длительность программы"}),
                        Block("td", {"textContent": program.Length})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Стоимость обучения"}),
                        Block("td", {"textContent": program.Price})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Место реализации программы"}),
                        Block("td", {"textContent": program.Place})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Минимальный размер группы" }),
                        Block("td", {"textContent": program.Minimum_group_size})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Начало занятий"}),
                        Block("td", {"textContent": "По мере набора группы"})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent":  "Выдаваемый документ"}),
                        Block("td", {"textContent": program.Issued_document})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "Требования к слушателям"}),
                        Block("td", {"textContent": program.Requirement})
                ]}),
                Block("tr", {
                    "children": [
                        Block("td", {"textContent": "О программе"}),
                        Block("td", {"children": [Block("a", {"textContent": "Учебный план", "href": "/aboutProgram"})]})
                ]}),
            ]
        }),
            Block("input", {
                "dataset": {"Title": program.Title, "Id": program.Id},
                "id": "subscribe_but",
                "value": "Записаться",
                "type": "button",
                "events": {onclick: createRegistrationForm}
            })
        ]
    })
)