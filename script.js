// 1. Preluare elemente din DOM
const taskInput = document.getElementById("task");
const todoList = document.getElementById("todo-list");
const form = document.querySelector("form");

// 2. URL JSON Server
const API_URL = "http://localhost:3000/tasks";

// 3. Afișare (GET)
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        todoList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.name;
            li.setAttribute("data-id", task.id);

            // Buton editare (placeholder)
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            // Buton ștergere
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Șterge";

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error("Eroare la preluarea taskurilor:", error);
    }
}

// Apelare fetchTasks la încărcare
window.addEventListener("DOMContentLoaded", fetchTasks);

// 4. Adăugare (POST)
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (!taskName) return;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: taskName }),
        });
        taskInput.value = "";
        fetchTasks();
    } catch (error) {
        console.error("Eroare la adăugare task:", error);
    }
});

// 5. Ștergere (DELETE)
todoList.addEventListener("click", async (e) => {
    if (e.target.textContent === "Șterge") {
        const li = e.target.closest("li");
        const id = li.getAttribute("data-id");

        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            fetchTasks();
        } catch (error) {
            console.error("Eroare la ștergere task:", error);
        }
    }
});
