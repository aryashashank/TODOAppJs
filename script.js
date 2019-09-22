let items, id, input, submitButton, editingId;

function init() {
    items = JSON.parse(localStorage.getItem('items')) || [
        new Item(1, "List items are displayed here", false),
        new Item(2, "Completed items look like this", true),
        new Item(3, "You can edit your list item using the edit icon or delete it", false)
    ];
    id = JSON.parse(localStorage.getItem('lastId')) || 0;
    input = document.querySelector(".addTodo");
    submitButton = document.querySelector('.submit');
    editingId = -1;
    displayList();
}



class Item {
    id;
    title;
    isCompleted;
    constructor(id, title, isCompleted) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}


function ifEnterSubmit(e) {
    if(e.charCode == 13) {
        addToList();
    }
}


function addToList() {
    if (!input.value || input.value.trim() == '') {
        alert("Please type an item in the list");
        return false;
    }
    if (editingId >= 0) {
        items.forEach((item) => {
            if (item.id == editingId) {
                item.title = input.value;
                editingId = -1;
            }
        });
    }
    else {
        let input = document.querySelector(".addTodo")
        items.push(new Item(id++, input.value, false));
        localStorage.setItem('lastId', id);
    }
    localStorage.setItem('items', JSON.stringify(items));
    input.value = "";
    submitButton.innerHTML = 'Create';
    displayList();
}

function displayList() {
    const list = document.querySelector('.todoList');
    list.innerHTML = '';
    if (items.length > 0) {
        items.forEach((item) => {
            let li = document.createElement('LI');
            li.innerHTML = item.title + " ";
            li.id = item.id;
            li.onclick = completed;
            let deleteButton = document.createElement('button');
            deleteButton.id = item.id;
            deleteButton.title="Delete this entry";
            deleteButton.classList.add('btn');
            deleteButton.onclick = deleteItem;
            
            let editButton = document.createElement('button');
            editButton.title="Edit this entry";
            editButton.id = item.id;
            editButton.classList.add('btn');
            editButton.onclick = editItem;


            if (item.isCompleted == true) {
                li.classList.add('completed');
            }

            let span = document.createElement('span');

            span.appendChild(editButton);
            span.appendChild(deleteButton);
            li.appendChild(span);
            list.appendChild(li);
        });
    }
}

function deleteItem(e) {
    e.stopPropagation();
    if (e.target.id) {
        items = items.filter(item => {
            return item.id != e.target.id;
        });
        input.value = '';
        submitButton.innerHTML = 'Create';
        if(items.length > 0) {
            localStorage.setItem('items', JSON.stringify(items));
        }
        else {
            localStorage.removeItem('items');
            id = 0;
            localStorage.setItem('lastId', 0);
        }
        displayList();
    }
}

function editItem(e) {
    e.stopPropagation();
    items.forEach(item => {
        if (item.id == e.target.id){
        if(!item.isCompleted) {
            input.value = item.title;
            editingId = item.id;
            submitButton.innerHTML = 'Edit';
            input.focus();
        }
        else {
            alert('Completed items cannot be edited.');
        }
    }
    });
}

function completed(e) {
    if (e.target = 'li') {
        let li = document.getElementById(e.target.id);
        items.forEach((item) => {
            if (e.target.id == item.id) {
                item.isCompleted = !item.isCompleted;
                item.isCompleted ? li.classList.add('completed') : li.classList.remove('completed');
            }
        });
        
    }
}



init();
