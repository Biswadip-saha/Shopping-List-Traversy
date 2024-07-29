const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

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

    // Create List-Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';
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

// Event Listeners

itemForm.addEventListener('submit', addItem);

// Clear Items

// Functions

function removeItems(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (window.confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function clearItems() {
    if (window.confirm('Are You Sure?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    checkUI();
}

// Event Listeners

itemList.addEventListener('click', removeItems);
clearBtn.addEventListener('click', clearItems);

// Clear UI state

// Functions

function checkUI() {
    if (itemList.firstChild) {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    } else {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    }
}

// Event Listeners

checkUI();

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
