// when we press 'Enter' key todo will be loaded
document.getElementById('todoInput')!.addEventListener('keypress', function(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// add new todo in 'li', clear input field, and wait 1 second and remove on click
function addTodo(): void {
    const input = document.getElementById('todoInput') as HTMLInputElement;
    const newTodoText: string = input.value.trim();
    if (newTodoText === '') return;

    const li = document.createElement('li');
    li.textContent = newTodoText;
    li.addEventListener('click', function() {
        this.classList.add('completed');
        setTimeout(() => {
            (this as HTMLElement).remove();
            updateLocalStorage();
        }, 1000);
    });

    document.getElementById('todoList')!.appendChild(li);
    input.value = '';

    updateLocalStorage();
}

// upon refreshing page, existing todos remain on page from localStorage until clicked and removed
function loadTodos(): void {
    const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todoText => {
        const li = document.createElement('li');
        li.textContent = todoText;
        li.addEventListener('click', function() {
            this.classList.add('completed');
            setTimeout(() => {
                (this as HTMLElement).remove();
                updateLocalStorage();
            }, 1000);
        });
        document.getElementById('todoList')!.appendChild(li);
    });
}

// this takes each todo and puts them in an array, and stores it in localStorage
function updateLocalStorage(): void {
    const todos: string[] = [];
    document.querySelectorAll<HTMLLIElement>('#todoList li').forEach(todo => {
        todos.push(todo.textContent || '');
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

window.onload = loadTodos;  // this will persist our todos even if we refresh the page
