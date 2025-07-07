const inputTask = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskOutput = document.getElementById("taskOutput");

function addTask() {
  const taskText = inputTask.value;

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button class="delete">Delete</button>`
  taskOutput.appendChild(li);
  inputTask.value = "";  
}

addTaskBtn.addEventListener("click", addTask);

function deleteTask(e) {
  if(e.target.classList.contains("delete")){
e.target.parentElement.remove();
  }
}
taskOutput.addEventListener("click", deleteTask);
