const todoValue = document.getElementById("todoText"),
listItems = document.getElementById("list-items"),
addUpdateClick = document.getElementById("addUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData")) | [];

todoValue.addEventListener("keypress", function(e) {
    if(e.key == "Enter" && todoValue.value != "") {
        addUpdateClick.click();
    }
});

let isUpdating = false;

addUpdateClick.addEventListener("click", function() {
    if (todoValue.value === "") {
        alert("Please enter a new task :-)");
        todoValue.focus();
    } else {
        if (isUpdating) {
            updateText.innerText = todoValue.value;
            addUpdateClick.setAttribute("onclick", "CompleteToDoItem()");
            addUpdateClick.setAttribute("src", "img/plus.png");
            todoValue.value = "";
            isUpdating = false;
        } else {
            let li = document.createElement("li");
            const todoItems = `<div ondblclick="CompleteToDoItem(this)">${todoValue.value}</div><div><img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="img/pencil.png" /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="img/trash.png" /></div>`;
            li.innerHTML = todoItems;
            listItems.appendChild(li);
            todoValue.value = "";
        }
    }
});


function CompleteToDoItem(e) {
    if(e.parentElement.querySelector("div").style.textDecoration === "") {
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
    }
}

function UpdateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    addUpdateClick.setAttribute("onclick", "CompleteToDoItem()");
    addUpdateClick.setAttribute("src", "img/plus.png");
    todoValue.value = "";
}


function UpdateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdateClick.setAttribute("src", "img/refresh.png");
        updateText = e.parentElement.parentElement.querySelector("div");
        isUpdating = true;
    }
}

function DeleteToDoItems(e) {
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if(confirm(`Are you sure you want to delete the task: ${deleteValue}?`)) {
        e.parentElement.parentElement.parentElement.querySelector("li").remove();
    }
}
