// ===== Variables =====
const inputField = document.getElementById("input-field");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const tableBody = document.getElementById("tbody");
const emptyInput = document.getElementById("empty-input");
const dateInput = document.getElementById("data");
const timeInput = document.getElementById("time");
const tagsInput = document.getElementById("tags");
const colorPickers = document.querySelectorAll(".color-picker");

let selectedColor = "#4bcffa";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskId = null;

// ===== Color Picker =====
colorPickers.forEach(picker => {
  picker.addEventListener("click", () => {
    selectedColor = picker.style.backgroundColor;
    inputField.style.color = selectedColor;  // تغییر رنگ متن ورودی
    inputField.style.borderColor = selectedColor;
  });
});

// ===== Display Tasks =====
function displayTasks() {
  tableBody.innerHTML = "";
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.className = "table-row";
    row.style.opacity = 0; // For fade-in animation

    row.innerHTML = `
      <td>${index + 1}</td>
      <td style="color: ${task.color}">${task.name}</td>
      <td>${task.date} ${task.time}</td>
      <td>${task.tags}</td>
      <td>
        <button class="status-button ${task.status}" data-id="${index}">${task.status}</button>
      </td>
      <td>
        <button class="edit-btn" data-id="${index}">Edit</button>
      </td>
      <td>
        <button class="remove-btn" data-id="${index}">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);

    setTimeout(() => row.style.opacity = 1, 50); // fade-in
  });

  addListeners();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Add/Edit Task =====
saveBtn.addEventListener("click", () => {
  const name = inputField.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const tags = tagsInput.value.trim();

  if (!name) {
    emptyInput.style.display = "block";
    return;
  }
  emptyInput.style.display = "none";

  if (editTaskId !== null) {
    tasks[editTaskId] = { name, date, time, tags, color: selectedColor, status: tasks[editTaskId].status };
    editTaskId = null;
  } else {
    tasks.push({ name, date, time, tags, color: selectedColor, status: "status-button" });
  }

  inputField.value = "";
  dateInput.value = "";
  timeInput.value = "";
  tagsInput.value = "";
  displayTasks();
});

// ===== Clear Input =====
clearBtn.addEventListener("click", () => {
  inputField.value = "";
  dateInput.value = "";
  timeInput.value = "";
  tagsInput.value = "";
  emptyInput.style.display = "none";
  editTaskId = null;
});

// ===== Add Event Listeners to Dynamic Buttons =====
function addListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const row = btn.closest("tr");
      row.style.opacity = 0; // fade-out
      setTimeout(() => {
        tasks.splice(id, 1);
        displayTasks();
      }, 300);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const task = tasks[id];
      inputField.value = task.name;
      dateInput.value = task.date;
      timeInput.value = task.time;
      tagsInput.value = task.tags;
      selectedColor = task.color;
      editTaskId = id;
    });
  });

  document.querySelectorAll(".status-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (tasks[id].status === "status-button") tasks[id].status = "inProgress";
      else if (tasks[id].status === "inProgress") tasks[id].status = "done";
      else tasks[id].status = "status-button";
      displayTasks();
    });
  });
}

// ===== Initial Display =====
displayTasks();
