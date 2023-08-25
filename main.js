let listItems = []

const form = document.querySelector('#form-itens')
const inputItems = document.querySelector('#receber-item')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    saveItems()
})

function saveItems(){
    const shoppingItem = inputItems.value
    listItems.some((element) => element.valor.toUpperCase() === shoppingItem.toUpperCase()) ? alert("Item já adicionado.") : listItems.push({
        valor: shoppingItem
    })

    console.log(listItems)
}