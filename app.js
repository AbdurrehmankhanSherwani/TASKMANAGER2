const STORAGE_KEY = "octoapps-day3-tasks";

let tasks = [];
let activeFilter = "all";

function createTask(text) {
  if (!text.trim()) throw new Error("Empty task");

  return {
    id: Date.now(),
    text,
    completed: false
  };
}

function addTask(text) {
  const stored = loadTasks();
  const task = createTask(text);

  tasks = [task, ...stored];
  saveTasks();
}

function deleteTask(id) {
  const stored = loadTasks();
  tasks = stored.filter(t => t.id !== id);
  saveTasks();
}

function toggleTask(id) {
  const stored = loadTasks();

  tasks = stored.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
export {
  addTask,
  deleteTask,
  toggleTask,
  loadTasks
};