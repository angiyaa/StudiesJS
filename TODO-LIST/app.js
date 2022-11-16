const addBtn = document.getElementById("add-btn");
const newTask = document.getElementById("inputText");
const ul = document.querySelector("ul");
const tasks = document.getElementsByTagName("li");

function isEmpty() {
    if(!(newTask.value.length > 0)) {
        return true;
    }
}

function addList() {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(newTask.value));
    ul.appendChild(li);
    newTask.value = ""; 

    let delBtn = document.createElement("button");
    delBtn.appendChild(document.createTextNode("X"));
    li.appendChild(delBtn);

    // Cross-out the task
    function onLiClick() {
        li.classList.toggle("done");
    }

    function onDeleteClick() {
        li.classList.toggle("delete");
    }

    // li.addEventListener("mouseover", onMouseover);
    li.addEventListener("click", onLiClick);
    delBtn.addEventListener("click", onDeleteClick);
}

function onAddClick() {
    if(isEmpty()) {
        alert("Please fill in the blank!");
    } else 
        addList();
}

addBtn.addEventListener("click", onAddClick);
