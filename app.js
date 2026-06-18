const STORAGE_KEY = "octoapps-day3-tasks";
 
let tasks = [];
let activeFilter = "all";
 
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskError = document.getElementById("task-error");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");
 
function createTask(rawText) {
  const text = rawText.trim();
 
  if (!text) {
    throw new Error("Please enter a task.");
  }
 
  return {
    id: `task-${Date.now()}`,
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
}
 
function addTask(text) {
  const task = createTask(text);
  tasks = [task, ...tasks];
  saveTasks();
  renderTasks();
}
 
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );
 
  saveTasks();
  renderTasks();
}
 
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}
 
function getFilteredTasks() {
  if (activeFilter === "active") {
    return tasks.filter(task => !task.completed);
  }
 
  if (activeFilter === "completed") {
    return tasks.filter(task => task.completed);
  }
 
  return tasks;
}
 
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
 
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
 
  if (!saved) return [];
 
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn("Invalid localStorage data");
    return [];
  }
}
 
function updateTaskCount() {
  const remaining = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${remaining} tasks remaining`;
}
 
function renderTasks() {
  const visibleTasks = getFilteredTasks();
 
  taskList.innerHTML = "";
  emptyState.hidden = visibleTasks.length !== 0;
 
  visibleTasks.forEach(task => {
    const item = document.createElement("li");
    item.dataset.taskId = task.id;
    item.className = task.completed ? "task--completed" : "";
 
    item.innerHTML = `
<span>${task.text}</span>
<div class="actions">
<button data-action="toggle">
          ${task.completed ? "Undo" : "Complete"}
</button>
<button data-action="delete">Delete</button>
</div>
    `;
 
    taskList.appendChild(item);
  });
 
  updateTaskCount();
}
 
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}
 
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
 
  try {
    addTask(taskInput.value);
    taskInput.value = "";
    taskError.textContent = "";
  } catch (error) {
    taskError.textContent = error.message;
  }
});
 
taskList.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;
 
  const item = button.closest("li");
  const id = item.dataset.taskId;
 
  if (button.dataset.action === "toggle") {
    toggleTask(id);
  }
 
  if (button.dataset.action === "delete") {
    deleteTask(id);
  }
});
 
filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    activeFilter = button.dataset.filter;
    renderTasks();
  });
});
 
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
 
document.addEventListener("DOMContentLoaded", function () {
  tasks = loadTasks();
  renderTasks();
});