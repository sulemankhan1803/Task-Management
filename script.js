 // Get references to various elements
const sidebar = document.getElementById("sidebar");
const sidebarCollapseButton = document.querySelector(".navbar-toggler");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");
const addTaskModal = new bootstrap.Modal(
    document.getElementById("addTaskModal")
);
const taskNameInput = document.getElementById("taskNameInput");
const taskDateInput = document.getElementById("taskDateInput");
const submitButton = document.getElementById("addTaskModalSubmit");
const myTasksBtn = document.getElementById("myTasksBtn");

// Retrieve tasks from local storage
const storedTasks = localStorage.getItem("tasks");
const tasks = storedTasks ? JSON.parse(storedTasks) : [];

sidebarCollapseButton.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});

addTaskBtn.addEventListener("click", function () {
    submitButton.textContent = "Add Task";
    taskNameInput.value = "";
    taskDateInput.value = "";
    addTaskModal.show();
});

submitButton.addEventListener("click", function () {
    const taskName = taskNameInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskName) {
        if (submitButton.textContent === "Update Task") {
            tasks[submitButton.dataset.index].name = taskName;
            tasks[submitButton.dataset.index].date = taskDate;
            renderTasks();
            submitButton.textContent = "Add Task";
        } else {
            tasks.push({ name: taskName, date: taskDate, completed: false });
            renderTasks();
        }

        addTaskModal.hide();
        taskNameInput.value = "";
        taskDateInput.value = "";

        // Update local storage with the updated tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateMyTasksList();
    }
});

function renderTasks() {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        tasksList.innerHTML += `
        <div class="task-item mb-2 p-2 d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""
            }">
          <div>
            <strong>${index + 1}. ${task.name}</strong>
            <p class="mb-0">${task.date ? `Due Date: ${task.date}` : ""}</p>
          </div>
          <div class="status">
            Status: <span class="badge ${task.completed ? "bg-success" : "bg-danger"
            } me-2">${task.completed ? "Completed" : "Pending"}</span>
          </div>
          <div class="d-flex">
            <button class="btn btn-sm btn-success me-2 ${task.completed ? "d-none" : ""
            }" onclick="markAsComplete(${index})">Mark as Complete</button>
            <button class="btn btn-sm btn-primary me-2" onclick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#addTaskModal">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;
    });
}

function editTask(index) {
    const task = tasks[index];
    taskNameInput.value = task.name;
    taskDateInput.value = task.date;
    submitButton.textContent = "Update Task";
    submitButton.dataset.index = index;
    addTaskModal.show();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    // Update local storage after deleting task
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateMyTasksList();
}

function markAsComplete(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle completed status
    renderTasks();
    // Update local storage after marking task status
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateMyTasksList();
}

function updateMyTasksList() {
    const storedTasks = localStorage.getItem("tasks");
    tasks.length = 0;
    if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        parsedTasks.forEach((task) => tasks.push(task));
    }
    renderTasks();
}

// Automatically render tasks when the page loads
window.addEventListener("load", function () {
    renderTasks();
});

// const myTasksBtn = document.getElementById('myTasksBtn');

myTasksBtn.addEventListener("click", function () {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        tasksList.innerHTML += `
        <div class="task-item mb-2 p-2 d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""
            }">
          <div>
            <strong>${index + 1}. ${task.name}</strong>
            <p class="mb-0">${task.date ? `Due Date: ${task.date}` : ""}</p>
          </div>
          <div class="status">
            Status: <span class="badge ${task.completed ? "bg-success" : "bg-danger"
            } me-2">${task.completed ? "Completed" : "Pending"}</span>
          </div>
          <div class="d-flex">
            <button class="btn btn-sm btn-success me-2 ${task.completed ? "d-none" : ""
            }" onclick="markAsComplete(${index})">Mark as Complete</button>
            <button class="btn btn-sm btn-primary me-2" onclick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#addTaskModal">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;
    });
});

const completedTasksBtn = document.getElementById("completedTasksBtn");

completedTasksBtn.addEventListener("click", function () {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (task.completed) {
            tasksList.innerHTML += `
        <div class="task-item mb-2 p-2 d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""
                }">
          <div>
            <strong>${index + 1}. ${task.name}</strong>
            <p class="mb-0">${task.date ? `Due Date: ${task.date}` : ""}</p>
          </div>
          <div class="status">
            Status: <span class="badge ${task.completed ? "bg-success" : "bg-danger"
                } me-2">${task.completed ? "Completed" : "Pending"}</span>
          </div>
          <div class="d-flex">
            <button class="btn btn-sm btn-success me-2 ${task.completed ? "d-none" : ""
                }" onclick="markAsComplete(${index})">Mark as Complete</button>
            <button class="btn btn-sm btn-primary me-2" onclick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#addTaskModal">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;
        }
    });
});

const pendingTasksBtn = document.getElementById("pendingTasksBtn");

pendingTasksBtn.addEventListener("click", function () {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (!task.completed) {
            tasksList.innerHTML += `
        <div class="task-item mb-2 p-2 d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""
                }">
          <div>
            <strong>${index + 1}. ${task.name}</strong>
            <p class="mb-0">${task.date ? `Due Date: ${task.date}` : ""}</p>
          </div>
          <div class="status">
            Status: <span class="badge ${task.completed ? "bg-success" : "bg-danger"
                } me-2">${task.completed ? "Completed" : "Pending"}</span>
          </div>
          <div class="d-flex">
            <button class="btn btn-sm btn-success me-2 ${task.completed ? "d-none" : ""
                }" onclick="markAsComplete(${index})">Mark as Complete</button>
            <button class="btn btn-sm btn-primary me-2" onclick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#addTaskModal">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;
        }
    });
});
