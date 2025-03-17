const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length) {
    todos.forEach(addTodo);
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Add a new todo
function addTodo(todo = {}) {
    const todoText = todo.text || input.value.trim();

    if (!todoText) return; 

    const todoEl = document.createElement('li');
    todoEl.innerText = todoText;
    if (todo.completed) todoEl.classList.add('completed');

    todosUL.appendChild(todoEl);
    input.value = '';
    input.focus();

    updateLocalStorage();
}

// Event delegation for toggling and removing todos
todosUL.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        updateLocalStorage();
    }
});

todosUL.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        e.target.remove();
        updateLocalStorage();
    }
});

// Update localStorage
function updateLocalStorage() {
    const todos = Array.from(todosUL.children).map(todoEl => ({
        text: todoEl.innerText,
        completed: todoEl.classList.contains('completed'),
    }));

    localStorage.setItem('todos', JSON.stringify(todos));
}
