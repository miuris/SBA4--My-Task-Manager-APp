document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskList = document.getElementById("taskList");
  const addBtn = document.getElementById("addBtn");
  const filters = document.querySelectorAll(".filter-btn");


  addBtn.addEventListener("click", () => {
    const name = document.getElementById("taskName").value.trim();
    const category = document.getElementById("category").value.trim();
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("status").value;

    if (!name || !category || !deadline) return alert("All fields are required.");

    const task = {
      id: Date.now(),
      name,
      category,
      deadline,
      status,
      deleted: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
    clearInputs();
  });

  function clearInputs() {
    document.getElementById("taskName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("status").value = "";
  }

  
  function renderTasks(taskArray) {
    taskList.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];

    taskArray
      .filter(task => !task.deleted)
      .forEach((task) => {
        const isOverdue = task.deadline < today && task.status !== "Completed";

        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
          <strong>${task.name}</strong> | ${task.category} | 
          Due: ${task.deadline} | Status: 
          <select onchange="updateStatus(${task.id}, this.value)">
            <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
          <button onclick="deleteTask(${task.id})">Delete</button>
          ${isOverdue ? "<span style='color:red'> (Overdue)</span>" : ""}
        `;
        taskList.appendChild(taskCard);
      });
  }

  
  function renderDeletedTasks(taskArray) {
    taskList.innerHTML = "";
    taskArray.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.className = "task-card deleted";
      taskCard.innerHTML = `
        <del><strong>${task.name}</strong> | ${task.category} | 
        Due: ${task.deadline} | Status: ${task.status}</del>
        <button onclick="restoreTask(${task.id})">Restore</button>
      `;
      taskList.appendChild(taskCard);
    });
  }


  window.updateStatus = function (id, newStatus) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  };

 
  window.deleteTask = function (id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, deleted: true } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  };


  window.restoreTask = function (id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, deleted: false } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  };

 
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const filter = btn.textContent.trim();
      const today = new Date().toISOString().split("T")[0];

      if (filter === "All") return renderTasks(tasks);
      if (filter === "Deleted") {
        const deletedTasks = tasks.filter(task => task.deleted);
        return renderDeletedTasks(deletedTasks);
      }
      if (filter === "Overdue") {
        const filtered = tasks.filter(
          task => task.deadline < today && task.status !== "Completed" && !task.deleted
        );
        return renderTasks(filtered);
      }

      const filtered = tasks.filter(
        task => task.status === filter && !task.deleted
      );
      renderTasks(filtered);
    })
  );

 
  renderTasks(tasks);
});
