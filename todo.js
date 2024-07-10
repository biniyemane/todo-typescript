// when we press 'Enter' key todo will be loaded
document.getElementById('todoInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
// add new todo in 'li', clear input field, and wait 1 second and remove on click
function addTodo() {
    var input = document.getElementById('todoInput');
    var newTodoText = input.value.trim();
    if (newTodoText === '')
        return;
    var li = document.createElement('li');
    li.textContent = newTodoText;
    li.addEventListener('click', function () {
        var _this = this;
        this.classList.add('completed');
        setTimeout(function () {
            _this.remove();
            updateLocalStorage();
        }, 1000);
    });
    document.getElementById('todoList').appendChild(li);
    input.value = '';
    updateLocalStorage();
}
// upon refreshing page, existing todos remain on page from localStorage until clicked and removed
function loadTodos() {
    var todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(function (todoText) {
        var li = document.createElement('li');
        li.textContent = todoText;
        li.addEventListener('click', function () {
            var _this = this;
            this.classList.add('completed');
            setTimeout(function () {
                _this.remove();
                updateLocalStorage();
            }, 1000);
        });
        document.getElementById('todoList').appendChild(li);
    });
}
// this takes each todo and puts them in an array, and stores it in localStorage
function updateLocalStorage() {
    var todos = [];
    document.querySelectorAll('#todoList li').forEach(function (todo) {
        todos.push(todo.textContent || '');
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
window.onload = loadTodos; // this will persist our todos even if we refresh the page
