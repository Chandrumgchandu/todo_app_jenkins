window.onload = loadTodos;

async function loadTodos() {
    const response = await fetch("/api/todos");
    const todos = await response.json();

    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${todo.completed ? "✅" : "⬜"}
            ${todo.title}

            <button onclick="completeTodo(${todo.id})">
                Complete
            </button>

            <button onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

async function addTodo() {

    const title =
        document.getElementById("todoInput").value;

    await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    document.getElementById("todoInput").value = "";

    loadTodos();
}

async function completeTodo(id) {

    await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: true
        })
    });

    loadTodos();
}

async function deleteTodo(id) {

    await fetch(`/api/todos/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}
