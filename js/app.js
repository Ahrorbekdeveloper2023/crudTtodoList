const formCreate = document.getElementById('form-create')
//const messageCreate = document.getElementById('message-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let updateTodoId;
// check LocalStorage:

let todos = JSON.parse(localStorage.getItem('list'))
    ? JSON.parse(localStorage.getItem('list'))
    : [];

if(todos.length) showTodos()

// SET TODOS:
function setTodosItem() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// Time:
function getTime() {
    const time = new Date();
    const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    const month = time.getMonth() < 10 ? '0' + (time.getMonth() + 1) : time.getMonth()
    const year = time.getFullYear()
    const hour = time.getHours() <= 0 ? '0'+ time.getHours() : time.getHours()
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    
    const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'Juny',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    fullDay.textContent = `${day} ${monthName[month - 1]} ${year}`

    hourEl.textContent = hour
    minuteEl.textContent = minutes
    secondEl.textContent = seconds

    return `${hour}:${minutes}:${seconds}, ${day}-${month} -${year}`
}

setInterval(getTime, 1000);


// show Todos:
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((item, index) => {
        listGroupTodo.innerHTML += `
            <li ondblclick="setCompleted(${index})"
             class="list-group-item d-flex justify-content-between 
             ${item.completed == true ? 'completed' : ''}"
            >
              ${item.text}
              <div class="todo-icons">
                <span class="opacity-50 me-2">${item.time}</span>
                <img onclick="updateTodo(${index})" src="./img/edit.svg" alt="edit-icon" width="25" height="25">
                <img onclick="deleteTodo(${index})" src="./img/delete.svg" alt="delete-icon" width="25" height="25">
              </div>
            </li>
        `

    })
    
}


// GET TODOS:

formCreate.addEventListener('submit', (e) => {
    e.preventDefault(); // sahifa yangilanishining oldini oladi:

    const todoText = formCreate['input-create'].value.trim() //input id stili yordamida inputga kiritilgan malumotni olish
    formCreate.reset(); // inputni tozalash

    if(todoText.length){
       todos.push({text: todoText, time: getTime(), completed: false})
       setTodosItem();
       showTodos();
    } else {
       inputError('message-create', 'Please, enter some text...');
    }
})

// show  error message function
function inputError(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 3000)
}

// DELETE TODO:
function deleteTodo(id) {
    const newTodos = todos.filter((item, index) => {
        return index !== id
    })

    todos = newTodos
    setTodosItem()
    showTodos()
}

// setCompleted:
function setCompleted(id){
    const setCompletedTodos = todos.map((todo, index) => {
        if( id == index ){
            return { ...todo, completed: todo.completed == true ? false : true}
        } else {
            return { ...todo}
        }
    })

    todos = setCompletedTodos
    setTodosItem()
    showTodos()
}

// form update:
formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if( todoText.length){
        todos.splice(updateTodoId, 1,
            {text: todoText,
            time: getTime(), 
            completed: false
        })
        setTodosItem()
        showTodos()
        close()
    } else {
        inputError('message-edit', 'Please, enter some text...')
    }
})
//UPDATE TODO:
function updateTodo(id){
    open()
    updateTodoId = id
}

//OPEN modal:
function open(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function close(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}


//close modal: 
document.addEventListener('keydown', (e) => {
    console.log(e)
    if(e.key == 'Escape'){
        close();
    }
})
overlay.addEventListener('click', close);
closeEl.addEventListener('click', close);
















































