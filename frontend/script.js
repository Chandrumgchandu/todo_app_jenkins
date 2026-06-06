window.onload = () => {

    const token =
        localStorage.getItem("token");

    if (token) {

        showTodoSection();

        loadTodos();

    }
};

function showTodoSection() {

    document.getElementById(
        "authSection"
    ).style.display = "none";

    document.getElementById(
        "todoSection"
    ).style.display = "block";
}

async function registerUser() {

    const username =
        document.getElementById(
            "registerUsername"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    const response =
        await fetch("/api/register", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

    const data =
        await response.json();

    alert(
        "Registered Successfully"
    );

    console.log(data);
}

async function loginUser() {

    const username =
        document.getElementById(
            "loginUsername"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const response =
        await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

    const data =
        await response.json();

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

        showTodoSection();

        loadTodos();

    } else {

        alert(
            "Invalid Credentials"
        );
    }
}

function logout() {

    localStorage.removeItem(
        "token"
    );

    location.reload();
}

async function loadTodos() {

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await fetch("/api/todos", {

            headers: {
                Authorization:
                    `Bearer ${token}`
            }

        });

    const todos =
        await response.json();

    const list =
        document.getElementById(
            "todoList"
        );

    list.innerHTML = "";

    todos.forEach(todo => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span class="${
                todo.completed
                    ? "completed"
                    : ""
            }">

                ${
                    todo.completed
                        ? "✅"
                        : "⬜"
                }

                ${todo.title}

            </span>

            <div class="todo-actions">

                <button
                    onclick="completeTodo(${todo.id})">
                    Complete
                </button>

                <button
                    onclick="deleteTodo(${todo.id})">
                    Delete
                </button>

            </div>
        `;

        list.appendChild(li);

    });
}

async function addTodo() {

    const token =
        localStorage.getItem(
            "token"
        );

    const title =
        document.getElementById(
            "todoInput"
        ).value;

    await fetch("/api/todos", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json",

            Authorization:
                `Bearer ${token}`
        },

        body: JSON.stringify({
            title
        })

    });

    document.getElementById(
        "todoInput"
    ).value = "";

    loadTodos();
}

async function completeTodo(id) {

    const token =
        localStorage.getItem(
            "token"
        );

    await fetch(
        `/api/todos/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`
            },

            body: JSON.stringify({
                completed: true
            })

        }
    );

    loadTodos();
}

async function deleteTodo(id) {

    const token =
        localStorage.getItem(
            "token"
        );

    await fetch(
        `/api/todos/${id}`,
        {

            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }

        }
    );

    loadTodos();
}
