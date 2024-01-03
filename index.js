// let shoppingItems = []
let counter = 0
let shoppingItems = []
const database = JSON.parse(localStorage.getItem("shoppingList"))

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

if (database && database.length > 1) {
    shoppingItems = database
    let lastIndex = shoppingItems.length - 1
    counter = Number(shoppingItems[lastIndex].itemID) + 1
    console.log(shoppingItems)
    render(shoppingItems)
} else {
    shoppingListEl.innerHTML = `<p style="text-align:center; width: 100%; font-size: 20px;">No items here... yet</p>`
}

addButtonEl.addEventListener("click", function() {
    let shoppingItem = generateItem()
    shoppingItems.push(shoppingItem)
    localStorage.setItem("shoppingList", JSON.stringify(shoppingItems) )
    render(shoppingItems)
    clearInputFieldEl()
})

function generateItem() {
    let item = {
        itemID: counter,
        inputValue: inputFieldEl.value
    }
    counter += 1
    return item
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function render(items) {
    shoppingListEl.innerHTML = ""
    for (let i = 0; i<items.length; i++) {
        let newEl = document.createElement("li")
        newEl.textContent = items[i].inputValue
        newEl.addEventListener("click", function() {
            shoppingItems = shoppingItems.filter(item => item.itemID !== items[i].itemID);
            localStorage.setItem("shoppingList", JSON.stringify(shoppingItems))
            render(shoppingItems)
        })
        
        shoppingListEl.append(newEl)
    }
    
}