const fs = require('fs');
const prompt = require('prompt-sync')();

const FILE_NAME = 'groceries.json';

let groceries =[];

function loadGroceries() {
    if (fs.existsSync(FILE_NAME)) {
        const data =fs.readFileSync(FILE_NAME);
        groceries = JSON.parse(data);
    }
}

function saveGroceries() {
    fs.writeFileSync(FILE_NAME, JSON.stringify(groceries, null, 2));
}

function displayGroceries() {
    console.log('/nGrocery List:');
    if (groceries.length === 0) {
        console.log('The grocery list is empty.');
    } else { 
        groceries.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`)
        });
    }
}

function calculateTotalcost() {
    return groceries.reduce((total, item) => total + item.price, 0);
}

function addGrocery() {
    const name = prompt('Enter the name of the grocery item: ');
    const price = parseFloat(prompt('Enter the price of the groceryitem: '));
    if (!isNaN(price) && price > 0){
        groceries.push({name,price});
        console.log('Grocery item added.');
    } else {
        console.log('invalid price.');
    }
}

function removeGrocery() {
    displayGroceries();
    const index = parseInt(prompt('Enter the num of the item to remove: ')) - 1;
    if (index >= 0 && index < groceries.length) {
        groceries.splice(index, 1);
        console.log('Grocery item removed.')
    } else {
        console.log('invalid item number.');
    }
}

function mainMenu() {
    while (true) {
        console.log('/nGrocery Manager');
        console.log('1. Add grocery item');
        console.log('2. Remove grocery item');
        console.log('3. Display grocery list');
        console.log('4. Calculate total cost');
        console.log('5. Save list to file');
        console.log('6. Load list from file');
        console.log('7.Exit');

        const choice = parseint(prompt('Choose an option: '));

        switch(choice) {
            case 1:
                addGrocery();
                break;
            case 2:
                removeGrocery();
                break;
            case 3:
                displayGroceries();
                break;
            case 4:
                console.log(`Total cost: $${calculateTotalCost().toFixed(2)}`)
                break;
            case 5:
                saveGroceries();
                console.log('Groceries saved to file.')
                break;
            case 6:
                loadGroceries();
                console.log('Groceries loaded from file.')
                break;
            case 7:
                console.log('Exiting');
                return;
            default:
                console.log('invalid choice. please try again.');

        }
    }
}

loadGroceries();
mainMenu();