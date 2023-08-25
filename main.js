let listItems = []

const form = document.querySelector('#form-itens')
const inputItems = document.querySelector('#receber-item')
const ulItems = document.querySelector('#lista-de-itens')
const ulShoppingItems = document.querySelector('#itens-comprados')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    saveItems()
    showItems()
    inputItems.focus()
})

function saveItems(){
    const shoppingItem = inputItems.value
    listItems.some((element) => element.value.toUpperCase() === shoppingItem.toUpperCase()) ? alert("Item já adicionado.") : listItems.push({
        value: shoppingItem,
        check: false
    })

    inputItems.value = ''
}

function showItems(){
    ulItems.innerHTML = ""
    ulShoppingItems.innerHTML = ""
    listItems.forEach((element, index) => {
        if(element.check){
            ulShoppingItems.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${element.value}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        } else {
            ulItems.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${element.value}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        }
    })

    const inputCheck = document.querySelectorAll('input[type="checkbox"]')

    inputCheck.forEach((element) => {
        element.addEventListener('click', (e) => {
            const valueElement = e.target.parentElement.parentElement.getAttribute('data-value')
            listItems[valueElement].check = e.target.checked
            showItems()
        })
    })
}