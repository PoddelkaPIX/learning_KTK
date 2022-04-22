updateArchive()

function updateArchive(){
    allProgramsList.innerHTML = ""
    for (let program of programArray){
        let listenerCount = 0
        for (let lis of listenerArray){
            if (program.Id == lis.Program_id && !(lis.Status_id == "1" || lis.Status_id == "5")){
                listenerCount += 1
            }
        }
        allProgramsList.append(Block("div", {
                    "id": program.Id,
                    "className": "programCard",
                    "dataset": {"Id": program.Id, "Title": program.Title} ,
                    "events": {onclick: openListenerList, oncontextmenu:programCardStatusMenu},
                    "children": [
                        Block("label", {"textContent": program.Title,}),
                        Block("div", {"name": "listenersCount_" + program.Id, "className": "listenerCount", "textContent": listenerCount,}),
                        Block("div", { "className": programStatusSelection(program.Status)})
                    ]
        }))
    }

    for (let listener of listenerArray){
        allListenersList.append(Block("div", {
            "className": "listener",
            "dataset": {"Id": listener.Id, "ProgramId": listener.Program_id, "Status": listener.Status_id},
            "textContent": listener.Surname + " " + listener.Name + " " + listener.Patronymic,
            "events": {oncontextmenu: listenerStatusMenu},
        }))
    }


    archiveView.append(allProgramsList)
}