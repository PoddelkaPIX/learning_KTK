function Send(method, uri, data) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, uri, false);
    let res

    xhr.onload = function (event) {
        res = JSON.parse(this.response)
        console.log("res: ", res);
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