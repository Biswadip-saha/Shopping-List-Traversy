const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Display Items

// Functions

function displayItems() {
    const itemsFromStorage = getItemsFromLocalStorage();

    // Adding "items" to DOM

    itemsFromStorage.forEach((item) => addItemToDOM(item));

    // Checking what to display in the UI

    checkUI();
}

// Add Event Listeners

document.addEventListener('DOMContentLoaded', displayItems);

// Clear UI state

// Functions

function checkUI() {
    // Resetting the input value to empty

    itemInput.value = '';

    if (itemList.firstChild) {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    } else {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    }

    // Resetting the form button to addItem

    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    // Resetting the editmode

    isEditMode = false;
}

// Event Listeners

checkUI();

// Add Items

// Functions

function addItem(e) {
    e.preventDefault();

    const inputValue = itemInput.value;

    // Validate Input

    if (inputValue === '') {
        alert('Please Add an item');
        return;
    }

    // Checks if edit mode is on

    if (!isEditMode) {
        // Checks if item already exist

        if (checkIfItemExist(inputValue)) {
            alert('That item already exist');
            return;
        }

        // Add item to DOM

        addItemToDOM(inputValue);

        // Add item to LocalStorage

        addItemToLocalStorage(inputValue);

        // Checking what to display in the UI

        checkUI();

        // Resetting the itemInput value

        itemInput.value = '';
    } else {
        const itemToEdit = itemList.querySelector('.edit-mode');

        // Removing the existing item

        removeItemFromLocalStorage(itemToEdit.textContent);

        // Removing the editMode class and the listItem while setting the editMode to false

        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;

        // Recursion to add the newItem

        addItem(e);
    }
}

function addItemToDOM(inputValue) {
    // Create List-Item

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes) {
    const icon = document.createElement('icon');
    icon.className = classes;

    return icon;
}

function addItemToLocalStorage(inputValue) {
    const itemsFromStorage = getItemsFromLocalStorage();

    // Pushing to LocalStorage

    itemsFromStorage.push(inputValue);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage() {
    let itemsFromStorage;

    // Checking if the LocalStorage contains "items" already or not

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Event Listeners

itemForm.addEventListener('submit', addItem);

// Clear Items

// Functions

function onClick(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        // Remove the "item" if clicked on cross

        removeItems(e.target.parentElement.parentElement);
    } else if (e.target.tagName == 'LI') {
        // EditMode if clicked elsewhere within the LI

        editMode(e.target);
    }
}

function removeItems(item) {
    if (confirm('Are You Sure?')) {
        // Remove item form DOM

        item.remove();

        // Remove item from the LocalStorage

        removeItemFromLocalStorage(item.textContent);

        //Checking What to display in the UI

        checkUI();
    }
}

function removeItemFromLocalStorage(text) {
    let itemsFromStorage = getItemsFromLocalStorage();

    // Filtering item to remove

    itemsFromStorage = itemsFromStorage.filter((item) => item != text);

    // Reset the LocalStorage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    if (window.confirm('Are You Sure?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }

    // Clear from LocalStorage

    localStorage.removeItem('items');

    //Checking What to display in the UI

    checkUI();
}

function editMode(item) {
    isEditMode = true;

    itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

// Event Listeners

itemList.addEventListener('click', onClick);
clearBtn.addEventListener('click', clearItems);

// FIlter Items

// Functions

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('li');

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.includes(text)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add Event Listeners

itemFilter.addEventListener('input', filterItems);

// Prevent Duplicate Item

// Function

function checkIfItemExist(item) {
    const itemsFromStorage = getItemsFromLocalStorage();

    let flag = false;

    itemsFromStorage.forEach((i) => {
        if (i.toLowerCase() == item.toLowerCase()) {
            flag = true;
        }
    });

    return flag;
}
