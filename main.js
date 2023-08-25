let listItems = []
let editItem

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
    listItems.some((element) => element.data.toUpperCase() === shoppingItem.toUpperCase()) ? alert("Item já adicionado.") : listItems.push({
        data: shoppingItem,
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
                    <span class="itens-comprados is-size-5">${element.data}</span>
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
                    <input type="text" class="is-size-5" value="${element.data}" ${index !== Number(editItem) ? 'disabled' : ''}></input>
                </div>
                <div>
                    ${index === Number(editItem) ?'<button onclick="saveEdit()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
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

    const deleteObject = document.querySelectorAll('.deletar')

    deleteObject.forEach((element) => {
        element.addEventListener('click', (e) => {
            valueElement = e.target.parentElement.parentElement.getAttribute('data-value')
            listItems.splice(valueElement, 1)
            showItems()
        })
    })

    const editItems = document.querySelectorAll('.editar')

    editItems.forEach((element) => {
        element.addEventListener('click', (e) => {
            editItem = e.target.parentElement.parentElement.getAttribute('data-value')
            showItems()
        })
    })
}

function saveEdit() {
    const editedItem = document.querySelector(`[data-value="${editItem}"] input[type="text"]`)
    listItems[editItem].data = editedItem.value
    console.log(listItems)
    editItem = -1
    showItems()
}