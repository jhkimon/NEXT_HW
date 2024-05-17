const todoInput = document.getElementById('content');
const todoList = document.getElementById('todo-list');
const submitBtn = document.getElementById('submitBtn');

function inputTodo() {
    const todo = todoInput.value;
    if (todo) {
        let todos = JSON.parse(window.localStorage.getItem('todos')) || [];
        todos.push(todo);
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function displayTodos() {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${todo} <button onclick="deleteTodo(${index})">삭제</button>`;
        todoList.appendChild(li);
    });
}

function deleteTodo(index) {
    let todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

displayTodos();
