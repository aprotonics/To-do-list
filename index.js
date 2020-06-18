let todoList = document.querySelector('.todo-list');
let todoNewItem = document.querySelector('.todo-new-item');
let todoAddButton = document.querySelector('.todo-add-button');
let todoItems = document.querySelectorAll('.todo-item');  
let todoHeadItemText = document.querySelector('.todo-headitem__text');
todoAddButton.disabled = true;

// Adding item to list
function addItem() {
    let todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    let todoItemBox = document.createElement('input');
    todoItemBox.classList.add('todo-item__box');
    todoItemBox.type = 'checkbox';
    todoItem.appendChild(todoItemBox);

    let todoItemText = document.createElement('p');
    todoItemText.classList.add('todo-item__text');
    todoItemText.textContent = ' ' + todoNewItem.value + ' ';
    todoItem.appendChild(todoItemText);

    let todoItemDelete = document.createElement('span');
    todoItemDelete.classList.add('todo-item__item-delete');
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

// Getting sorted item list
function getSorted() {
    let sortedValue = 0;
    
    // Event Listener for sorting items
    todoHeadItemText.addEventListener('click', function() {

        // Getting sorted array of item names
        let todoItems = document.querySelectorAll('.todo-item');
        console.log(todoItems);
        let itemNames = [];
        for (let i = 0; i < todoItems.length; i++) {
            let todoItemText = todoItems[i].querySelector('.todo-item__text');
            let itemName = todoItemText.textContent;
            itemNames.push(itemName);
        }
        switch (sortedValue) {
            case 0:
                itemNames.sort((a, b) => a > b ? 1 : -1);
                break;

            case 1:
                itemNames.sort((a, b) => a > b ? -1 : 1);
                break;

            case -1:
                itemNames.sort((a, b) => a > b ? 1 : -1);
                break;
        }
            
        // Adding sorted item names to list
        for (let i = 0; i < itemNames.length; i++) {
            let todoItemText = todoItems[i].querySelector('.todo-item__text');
            todoItemText.textContent = itemNames[i];
        }

        switch (sortedValue) {
            case 0:
                sortedValue = 1;
                break;

            case 1:
                sortedValue = -1;
                break;

            case -1:
                sortedValue = 1;
                break;
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
});

// Getting sorted item list
getSorted();




