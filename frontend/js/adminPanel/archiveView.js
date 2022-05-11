let informations = document.getElementById("informations")
let starDateInput = document.getElementById("startDate")
let finishDateInput = document.getElementById("finishDate")
updateArchive()

let switchArchiveListsButton = document.getElementById("switchArchiveListsButton")
switchArchiveListsButton.onclick = switchLists

let searchArc = document.getElementById("searchArc")

if (searchArc) {
    searchArc.oninput = updateSearchArc
}

function updateSearchArc(){
    if (timeout !== 0) {
        clearTimeout(timeout)
        timeout = 0;
    }
    timeout = setTimeout(() => {
        let programs = document.querySelectorAll("#allProgramsList .programCard")
        for (let program of programs){
            let text = program.firstChild.textContent.toLowerCase()
            if (!text.includes(searchArc.value.toLowerCase())){
                program.classList.add("hide")
            }else{
                program.classList.remove("hide")
            }
            filteringByDate()
        }
        let listeners = document.querySelectorAll("#allListenersList .listener")
        for (let listener of listeners){
            let text = listener.firstChild.textContent.toLowerCase()
            if (!text.includes(searchArc.value.toLowerCase())){
                listener.classList.add("hide")
            }else{
                listener.classList.remove("hide")
            }
        }
    }, 400);
}


function updateArchive(){
    allProgramsList.innerHTML = ""
    allListenersList.innerHTML = ""
    for (let program of programArray){
        let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id){
                listenerCount += 1
            }
        }
        let prog = createProgramCard(program, "Archive")
        if ("Program: " + prog.dataset.Id == selectedCardArc){
            prog.classList.add("selectedProgram")
        }
        allProgramsList.append(prog)
    }

    for (let listener of listenerArray){
        lis = Block("div", {
            "className": "listener",
            "dataset": {"ListenerId": listener.Id, "Id": listener.Program_id, "Status": listener.Status_id},
            "events": {onclick: openListenerInformation, oncontextmenu: listenerStatusMenu},
            "children": [
                Block("label", {"textContent": listener.Surname + " " + listener.Name + " " + listener.Patronymic}),
                Block("div", { "className": "status " + listenerStatusSelection(listener.Status)})
            ]
        })
        if ("Listener:" + lis.dataset.ListenerId == selectedCardArc){
            lis.classList.add("selectedProgram")
        }
        allListenersList.append(lis)
    }
}

function openListenerInformation(){
    selectedCardArc = "Listener:" + this.dataset.ListenerId
    informations.innerHTML = ""


    let card 
    for (let program of programArray){
        if (program.Id == this.dataset.Id){
            card = createProgramCard(program, "Archive")
        }
    }
    
    informations.append(card, createListenersTable(this.dataset))
    update()
    // checkListenerCheckBox()
    // let checkBoxListeners = document.getElementsByClassName("checkBoxListenerArc")
    // let checkBox = document.getElementById("selectAllCheckBoxArc")
    // for (let box of checkBoxListeners){box.onclick = checkListenerCheckBox}
    // checkBox.onclick = function(){for(let box of checkBoxListeners ){ box.checked = checkBox.checked ; checkListenerCheckBox()}}
}

// starDateInput.onchange = filteringByDate
// finishDateInput.onchange = filteringByDate

// function filteringByDate(){
//     allProgramsList = document.getElementById("allProgramsList")
//     allListenersList = document.getElementById("allListenersList")
//     let startDate = new Date(starDateInput.value)
//     let finishDate = new Date(finishDateInput.value)


//     for (let i of allProgramsList.children){
//         let date = new Date(i.dataset.startDate)
//         if (date == "Invalid Date"){
//             i.classList.add("hide")
//             continue
//         }else{
//             i.classList.remove("hide")
//         }
//         if (startDate.toDateString() != "Invalid Date" && finishDate.toDateString() != "Invalid Date"){
//             if (startDate > date || date > finishDate){
//                 console.log(i.dataset.startDate);
//                 i.classList.add("hide")
//             }else{
//                 i.classList.remove("hide")
//             }
//         }else{
//             i.classList.remove("hide")
//         }
//         updateSearchArc()
//     }
// }
