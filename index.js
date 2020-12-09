let todoList = document.querySelector('.todo-list');
let todoNewItem = document.querySelector('.todo-new-item');
let todoAddButton = document.querySelector('.todo-add-button');
let todoHeadItemText = document.querySelector('.todo-headitem__text');
todoAddButton.disabled = true;

function createElement(tagName, className) {
    let todoElement = document.createElement(tagName);
    todoElement.classList.add(className);
    return todoElement;
}

// Adding item to list
function addItem() {
    let todoItem = createElement('li', 'todo-item');

    let todoItemBox = createElement('input', 'todo-item__box');
    todoItemBox.type = 'checkbox';
    todoItem.appendChild(todoItemBox);

    let todoItemText = createElement('p', 'todo-item__text');
    todoItemText.textContent = ' ' + todoNewItem.value + ' ';
    todoItem.appendChild(todoItemText);

    let todoItemDelete = createElement('span', 'todo-item__item-delete');
    todoItem.appendChild(todoItemDelete);

    todoList.appendChild(todoItem);

    todoNewItem.value = '';
    todoAddButton.disabled = true;
}

// Crossing out selected item
function getFulfilled() {
    let todoItems = document.querySelectorAll('.todo-item');
    let todoItem = todoItems[todoItems.length - 1];
    let todoItemBox = todoItem.querySelector('.todo-item__box');
    let todoItemText = todoItem.querySelector('.todo-item__text');
    let todoItemDelete = todoItem.querySelector('.todo-item__item-delete');

    // Event Listener for crossing out
    todoItemBox.addEventListener('change', function() {
        if (todoItemText.style.textDecoration !== 'line-through') {
            todoItemText.style.textDecoration = 'line-through';
            todoItemDelete.classList.add('todo-item__item-delete_show');
        } else {
            todoItemText.style.textDecoration = 'none'; 
            todoItemDelete.classList.remove('todo-item__item-delete_show');  
        }    
    });
}

// Deleting item from list
function getDeleted() {
    let todoItems = document.querySelectorAll('.todo-item');
    let todoItem = todoItems[todoItems.length - 1];
    let todoItemDelete = todoItem.querySelector('.todo-item__item-delete');

    // Event Listener for deleting item
    todoItemDelete.addEventListener('click', function() {
        todoItem.remove();
    });
}

// Getting attached item list
function getAttached() {
    let todoItems = document.querySelectorAll('.todo-item');  
    let todoItem = todoItems[todoItems.length - 1];

    // Event Listener for getting attached item
    todoItem.addEventListener('dblclick', function() {
        !todoItem.classList.contains('todo-item_attached') ?
            todoItem.classList.add('todo-item_attached') :
            todoItem.classList.remove('todo-item_attached');
    });
}

// Sorting items for getSorted-function
function sort(items) {
    items.sort((a, b) => {
        if (a.children[1].textContent > b.children[1].textContent) {
            return 1;
        }
        if (a.children[1].textContent < b.children[1].textContent) {
            return -1;
        }
        return 0;
    });
    return items;
}

// Reverse-sorting items for getSorted-function
function reverseSort(items) {
    items.sort((a, b) => {
        if (a.children[1].textContent < b.children[1].textContent) {
            return 1;
        }
        if (a.children[1].textContent > b.children[1].textContent) {
            return -1;
        }
        return 0;
    });
    return items;
}

// Getting sorted item list
function getSorted() {
    let sortedValue = 0;
    
    // Event Listener for sorting items
    todoHeadItemText.addEventListener('click', function() {
        let todoItems = document.querySelectorAll('.todo-item');
        todoItems = Array.from(todoItems);
        sort(todoItems); 

        switch (sortedValue) {
            case 0:
                sort(todoItems); 
                sortedValue = 1;
                break;
            case 1:
                reverseSort(todoItems);
                sortedValue = -1; 
                break;
            case -1:
                sort(todoItems); 
                sortedValue = 1;
                break;
        }
            
        for  (let i = 0; i < todoItems.length; i++) {
            todoList.append(todoItems[i]);
        }
    });
}

// Event Listener for changing input text
todoNewItem.addEventListener('input', function() {
    if (!todoNewItem.value) {
        todoAddButton.disabled = true;
    } else {
        todoAddButton.disabled = false;
    }
})

// Event Listener for adding item
todoAddButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    addItem(); 
    getFulfilled();
    getDeleted();
    getAttached();
});
document.addEventListener('DOMContentLoaded', getSorted);
// Getting sorted item list
//getSorted();




