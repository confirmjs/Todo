const plusI = document.querySelector('.plus')
const boxes = document.querySelector('.boxes')
const input = document.querySelector('.input')
const delIcon = document.querySelector('.delIcon')
const changeIcon = document.querySelector('.changeIcon')
const readyIcon = document.querySelector('#readyIcon')
const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const hour = `${new Date().getHours()} : ${new Date().getMinutes()}`
const allCount = document.querySelector('.all')
const completedCount = document.querySelector('.completed')
const box = document.querySelector('.box')


window.addEventListener('DOMContentLoaded', () => {
    const todoData = JSON.parse(localStorage.getItem('task'))
    const completedTodos = todoData.filter(item => item.completed)


    allCount.innerText = `All : ${todoData.length}`
    completedCount.innerText = `Completed: ${completedTodos.length}`
})

if(!localStorage.getItem('task')) {
    localStorage.setItem('task', JSON.stringify([]))
}else {
    JSON.parse(localStorage.getItem('task'))
}

if (JSON.parse(localStorage.getItem('task'))) {
    const task = JSON.parse(localStorage.getItem('task'))
    task.forEach(item => {
        boxes.insertAdjacentHTML('afterbegin', temp(item.title, item.date, item.hour, item.id, item.completed))
    })
}

plusI.addEventListener('click', (e) => {
    const todo = JSON.parse(localStorage.getItem('task'))
    const newTodo = {
        title: input.value,
        id: new Date().valueOf(),
        completed: false,
        date: date,
        hour: hour
    }
    todo.push(newTodo)
    localStorage.setItem('task', JSON.stringify(todo))
    boxes.insertAdjacentHTML('afterbegin', temp(input.value, date, hour))
    input.value = ''
})




function temp (title, dateP, hourP, id, isCompleted) {
    return `
            <div class="box ${isCompleted ? 'completed' : ''}">
                <div class="text">
                    <h2>${title}</h2>
                </div>
                <div class="fonts">
                    <i class="fa-solid fa-trash delIcon" onclick="deleteTodo(${id})"></i>
                    <i class="fa-regular fa-pen-to-square changeIcon" onclick="editTodo(${id})"></i>
                    <i class="fa-solid fa-check"  onclick="completeTodo(${id})" id="readyIcon"></i>
                </div>
                <p class="dateP">${dateP} <span class="hour">${hourP}</span></p> 
            </div>
    `
}

function deleteTodo(id) {
    if (JSON.parse(localStorage.getItem('task'))) {
        const data = JSON.parse(localStorage.getItem('task'))
        const newwDataBase = data.filter(item => {
            if (item.id !== id) {
                return item 
            }
        })
        localStorage.setItem('task', JSON.stringify(newwDataBase))
        window.location.reload()
    }
}



function editTodo(id) {
    if (JSON.parse(localStorage.getItem('task'))) {
        const dataBase = JSON.parse(localStorage.getItem('task'))
        const newDataBase = dataBase.map(item => {
            if (item.id === id) {
                const askTitle = prompt('New Task')
                item.title = askTitle
            }
            return item
        })
        localStorage.setItem('task', JSON.stringify(newDataBase))
    } window.location.reload()
}



function completeTodo(id){
    if (JSON.parse(localStorage.getItem('task'))) {
        const dataBase = JSON.parse(localStorage.getItem('task'))
        const newDataBase = dataBase.map(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item
        }) 
        localStorage.setItem('task', JSON.stringify(newDataBase))
    }
    window.location.reload()
}

