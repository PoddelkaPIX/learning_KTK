let educationList = [Block("option", {})]
let res = Send("post", "/api/getEducations", null)
for (i of res){
    educationList.push(Block("option", {"textContent": i}))
}

function createRegistrationForm(){
    document.body.style.overflow = "hidden"
    document.body.appendChild(Block("div", {"id": "backWall", "children": [
                            Block("form", {"id": "forma", 
                                    "children": [
                                        Block("i", {
                                            "className": "fas fa-xmark",
                                            "events": {onclick: deleteRegistrationForm}
                                        }),
                                        Block("input", {
                                            "name": "program_id",
                                            "value": this.dataset.Id,
                                            "className": "hide",
                                        }),
                                        Block("input", {
                                            "name": "status",
                                            "value": this.dataset.Status,
                                            "className": "hide",
                                        }),
                                        Block("div", {
                                        "id": "title",
                                        "children": [
                                            Block("h3", {
                                                "textContent": this.dataset.Title,
                                                "style": "text-align: center;"
                                            }),
                                        ]}),
                                        Block("div", {"className": "user-box",
                                                    "children": [
                                                        Block("lable", {
                                                            "textContent": "Фамилия"
                                                        }),
                                                        Block("input", {
                                                            "id": "surname",
                                                            "name": "surname",
                                                            "required": true
                                                        })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                                        "children": [
                                                            Block("lable", {"textContent": "Имя"}),
                                                            Block("input", {
                                                                "id": "name",
                                                                "name": "name",
                                                                "required": true
                                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                                        "children": [
                                                            Block("lable", {"textContent": "Отчество"}),
                                                            Block("input", {
                                                                "id": "patronymic",
                                                                "name": "patronymic",
                                                                "required": true
                                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                        "children": [
                                            Block("lable", {
                                                "textContent": "Дата рождения"
                                            }),
                                            Block("input", {
                                                "id": "birth_date",
                                                "name": "birth_date",
                                                "type": "date",
                                                "style": "text-align: center ;",
                                                "required": true
                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                        "children": [
                                            Block("lable", {
                                                "textContent": "Снилс"
                                            }),
                                            Block("input", {
                                                "id": "snils",
                                                "name": "snils",
                                                "required": true
                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                        "children": [
                                            Block("lable", {
                                                "textContent": "Почта"
                                            }),
                                            Block("input", {
                                                "id": "email",
                                                "name": "email",
                                                "required": true
                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                        "children": [
                                            Block("lable", {
                                                "textContent": "Телефон"
                                            }),
                                            Block("input", {
                                                "id": "telephone",
                                                "name": "telephone",
                                                "type": "tel",
                                                "required": true
                                            })
                                        ]}),
                                        Block("div", {"className": "user-box",
                                        "children": [
                                            Block("lable", {
                                                "textContent": "Образование"
                                            }),
                                            Block("select", {
                                                "id": "education",
                                                "name": "education",
                                                "style": "width:100%;",
                                                "children": educationList
                                                })
                                        ]}),
                                        Block("span", {
                                            "id": "failedAlert",
                                        }),
                                        Block("input", {
                                            "type": "button", 
                                            "dataset": {"Id": this.dataset.Id, "Status": this.dataset.Status},
                                            "value": "Записаться", 
                                            "id": "registration_but",
                                            "events": {onclick: checkFields}
                                        })
                            ]})
                        ]})
                        )
}
function deleteRegistrationForm(){
    document.body.style.overflow = ""
    let forma = document.getElementById("backWall")
    forma.remove()
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
            Program: this.dataset.Program
        })
        deleteRegistrationForm()
    }
}
