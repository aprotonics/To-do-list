let todoList = document.querySelector('.todo-list');
let todoNewItem = document.querySelector('.todo-new-item');
let todoAddButton = document.querySelector('.todo-add-button');
let todoItems = document.querySelectorAll('.todo-item');  
let todoHeadItemText = document.querySelector('.todo-headitem__text');

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
}

// Cross out selected item
function getFulfilled() {
    todoItems = document.querySelectorAll('.todo-item');  
    for (let i = 0; i < todoItems.length; i++) {
        let todoItem = todoItems[i];
        let todoItemBox = todoItem.querySelector('.todo-item__box');
        let todoItemText = todoItem.querySelector('.todo-item__text');
        let todoItemDelete = todoItem.querySelector('.todo-item__item-delete');

        // Event Listener for decorating
        todoItemBox.addEventListener('change', function() {
            if (todoItemText.style.textDecoration !== 'line-through') {
                todoItemText.style.textDecoration = 'line-through';
                todoItemDelete.classList.add('todo-item__item-delete_show');
            } else {
                todoItemText.style.textDecoration = 'none';    
                todoItemDelete.classList.remove('todo-item__item-delete_show');
            }
        });

        // Event Listener for deleting
        todoItemDelete.addEventListener('click', function() {
            todoItem.remove();
        });
    }
}


// Event Listener for adding
todoAddButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    addItem(); 
    
    // Add Event Listener to new Items on change of checkbox 
    todoItems = document.querySelectorAll('.todo-item');
    let todoItem = todoItems[todoItems.length - 1];
    let todoItemBox = todoItem.querySelector('.todo-item__box');
    let todoItemText = todoItem.querySelector('.todo-item__text');
    let todoItemDelete = todoItem.querySelector('.todo-item__item-delete');

    // Event Listener for decorating
    todoItemBox.addEventListener('change', function() {
        if (todoItemText.style.textDecoration !== 'line-through') {
            todoItemText.style.textDecoration = 'line-through';
            todoItemDelete.classList.add('todo-item__item-delete_show');
        } else {
            todoItemText.style.textDecoration = 'none'; 
            todoItemDelete.classList.remove('todo-item__item-delete_show');  
        }    
    });

    // Event Listener for deleting
    todoItemDelete.addEventListener('click', function() {
        todoItem.remove();
    });
});

getFulfilled();



// Event Listener for sorting
todoHeadItemText.addEventListener('click', function() {
    // Getting sorted array of item names
    todoItems = document.querySelectorAll('.todo-item');
    console.log(todoItems);
    let itemNames = [];
    for (let i = 0; i < todoItems.length; i++) {
        let todoItemText = todoItems[i].querySelector('.todo-item__text');
        let itemName = todoItemText.textContent;
        itemNames.push(itemName);
    }
    console.log(itemNames);
    itemNames.sort();
    console.log(itemNames);

    // Adding sorted item names to list
    for (let i = 0; i < itemNames.length; i++) {
        let todoItemText = todoItems[i].querySelector('.todo-item__text');
        todoItemText.textContent = itemNames[i];
    }
    console.log(todoItems);
});