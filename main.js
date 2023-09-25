const list_el = document.getElementById('list');
const create_btn_el = document.getElementById('create');

let todos = [];//Global Variable to hold all the Todo tasks

create_btn_el.addEventListener('click', CreateNewTodo);
function CreateNewTodo() {
    const item = {
        id: new Date().getTime(),//Current Time
        text: "",
        complete: false
    }

    todos.unshift(item);//Add new todo item to the starting(top) of the List/Array

    const {item_el, input_el} = CreateTodoElement(item);//Function to Create new todo element

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled")
    input_el.focus();//Focus the element

    save();
}

/* <div class="item">
            <input type="checkbox">
            <input type="text" value="Todocontent goes here" disabled>
            <div class="actions">
                <button class="material-symbols-outlined">edit</button>
                <button class="material-symbols-outlined remove-btn">delete</button>
            </div>
    </div> */
//Create todo
function CreateTodoElement(item) {

    //create div with class "item"
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    //create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete) {
        item_el.classList.add("complete");
    }

    //Create input element
    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");
    

    //Create div with class "action"
    const action_el = document.createElement("div");
    action_el.classList.add("actions");

    //create icons for edit and delete
    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-symbols-outlined");
    edit_btn_el.innerText = "edit";
    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-symbols-outlined", "remove-btn");
    remove_btn_el.innerText = "delete";


    //Adding created elments
    //Adding buttons to action div
    action_el.append(edit_btn_el);
    action_el.append(remove_btn_el);

    //Adding to list  div
    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(action_el);


    //Events
    checkbox.addEventListener('change', () => {
        item.complete = checkbox.checked;

        if(item.complete) {
            item_el.classList.add("complete");
        }else {
            item_el.classList.remove("complete");
        }

        save();
    });

    input_el.addEventListener('input', () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", () => {
        input_el.setAttribute("disabled", "");
        save();
    })

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        item_el.remove();
        save();
    })

    return {item_el, input_el, edit_btn_el, remove_btn_el};
}

//Display saved todos
function DisplayTodos() {
    Load();
    
    for(let i = 0 ; i < todos.length; i++) {
        const items = todos[i];

        const { item_el } = CreateTodoElement(items);

        list_el.append(item_el);
    }
}

DisplayTodos();

function save(){
    //Save todos
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos", save);
}

//Loading data from local storage
function Load() {
    const data = localStorage.getItem("my_todos");

    if(data) {
        todos = JSON.parse(data);//Parse string to an object of json
    }
}
