const inputTask = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskOutput = document.getElementById("taskOutput");

let tasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

function loadTasks() {
  taskOutput.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete">Delete</button>`
    taskOutput.appendChild(li);
  });
}

taskOutput.addEventListener("click", deleteTask);

function addTask() {
  const taskText = inputTask.value.trim();
  if (!taskText) return;

 

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button class="delete">Delete</button>`
  taskOutput.appendChild(li);
  inputTask.value = "";

  tasks.push(taskText);
  saveTasks();
}

addTaskBtn.addEventListener("click", addTask);

function deleteTask(e) {
  if (e.target.classList.contains("delete")) {
    const taskText = e.target.parentElement.textContent.replace("Delete", "").trim();
    tasks = tasks.filter(task => task !== taskText);
    e.target.parentElement.remove();
    saveTasks();
  }
}

loadTasks();