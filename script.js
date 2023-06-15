//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list');
let items;

//call event listeners
eventListeners();

//load items
loadItems();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem)

    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();


    items.forEach(function (item) {
        createItem(item);
    });
}

//get items from local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//delete item from LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

//set item to local storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}


function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));


    //create a
    const a = document.createElement('a');
    a.classList = "delete-item float-right";
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);
}

//add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item');
    }

    //create ıtem
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);


    //clear input
    input.value = '';

    e.preventDefault();
}

//delete an Item
function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure?')) {
            console.log(e.target);
            e.target.parentElement.parentElement.remove();

            //delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    if (confirm('are you sure?')) {


        //taskList.innerHTML='';

        // taskList.childNodes.forEach(function (item) {
        //     if (item.nodeType === 1) {
        //         item.remove();
        //     }

        // });

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }


    e.preventDefault();
}

