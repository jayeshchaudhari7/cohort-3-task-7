let close = document.querySelector(".close");
let formDiv = document.querySelector(".form-div");
let creatTask = document.querySelector(".createTask");
let statusStack = document.querySelector(".task-status");
let statusItems = document.querySelectorAll(".task-status p");
let form = document.querySelector("form");
let taskContainer = document.querySelector(".task-cards-container");
let searchInput = document.querySelector("#search");
let main = document.querySelector("main");
let theme = document.querySelector(".ri-sun-fill");

let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
let editIdx = null;

function ui(data = tasksArr) {
  taskContainer.innerHTML = "";
  data.forEach((elem, idx) => {
    taskContainer.innerHTML += `<div class="task-card">
                        <div class="text">
                            <h3 class="taskname">${elem.taskName}</h3>
                            <h3 class="taskstatus">${elem.taskStatus}</h3>
                        </div>
                        <div class="btns">
                            <button onclick="editTask(${idx})" id="update">Edit <i class="ri-pencil-fill"></i></button>
                            <button onclick="deleteTask(${idx})" id="delete">Delete <i class="ri-delete-bin-fill"></i></button>
                        </div>
                    </div>`;
  });
}
ui();

form.addEventListener("submit", (e) => {
  e.preventDefault(form);

  let taskName = e.target[0].value;
  let taskStatus = e.target[1].value;

  if (taskName.trim() === "" || taskStatus.trim() === "") {
    alert("enter valid data");
    return;
  }

  let obj = {
    taskName,
    taskStatus,
  };

  if (editIdx === null) {
    tasksArr.push(obj);
    formDiv.style.display = "none";
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  } else {
    tasksArr[editIdx] = obj;
    editIdx = null;
    formDiv.style.display = "none";
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }

  ui();
  form.reset();
});

function editTask(idx) {
  formDiv.style.display = "flex";
  editIdx = idx;
  let task = tasksArr[editIdx];
  console.log(task);

  form[0].value = task.taskName;
  form[1].value = task.taskStatus;
}

function deleteTask(idx) {
  tasksArr.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  ui();
}

close.addEventListener("click", () => {
  formDiv.style.display = "none";
});

creatTask.addEventListener("click", () => {
  formDiv.style.display = "flex";
});

statusStack.addEventListener("click", (e) => {
  if (e.target.tagName !== "P") return;

  statusItems.forEach((item) => item.classList.remove("active"));
  e.target.classList.add("active");

  const status = e.target.textContent;
  console.log(status);

  if (status === "All") {
    ui(tasksArr);
    return;
  }

  const filteredTasks = tasksArr.filter((task) => task.taskStatus === status);

  ui(filteredTasks);
});

searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const filteredTasks = tasksArr.filter((task) =>
    task.taskName.toLowerCase().includes(searchText),
  );

  ui(filteredTasks);
});

theme.addEventListener("click", () => {
  main.classList.toggle("dark");
});

const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

grandparent.addEventListener("click", () => {
    
    console.log("Grandparent");
});

parent.addEventListener("click", () => {
  console.log("Parent");
});

child.addEventListener("click", () => {
    console.log('Event bubbling output');
  console.log("Child");
});

const grandparent2 = document.querySelector(".grandparent2");
const parent2 = document.querySelector(".parent2");
const child2 = document.querySelector(".child2");

grandparent2.addEventListener(
  "click",
  () => {
    console.log('Event capturing output');
    console.log("Grandparent");
  },
  true,
);

parent2.addEventListener(
  "click",
  () => {
    console.log("Parent");
  },
  true,
);

child2.addEventListener(
  "click",
  () => {
    console.log("Child");
  },
  true,
);
