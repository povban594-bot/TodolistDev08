const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
const input = document.getElementById("search");
const clearBtn = document.getElementById("clearBtn");
const deleteList = document.getElementById("deleteButton");
const totalTask = document.getElementById("taskCount");


document.addEventListener("DOMContentLoaded", () => loadTasks());
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click",(e)=> {loadTasks()
  input.value="";
});




taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
input.addEventListener('input', (e) => {

  loadTasks(input.value)
 
});
function searchTask(seachtext) {
  const p = seachtext.toLowerCase();
  completedList = loadTasks().filter(el => el.text && el.text.toLowerCase().includes(p))
}
function loadTasks(searchText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // clear current lists
  todoList.innerHTML = "";
  completedList.innerHTML = "";

  let filtered = tasks;
  if (searchText) {
    const p = String(searchText).trim().toLowerCase();
    if (p.length) {
      filtered = tasks.filter(t => t.text && t.text.toLowerCase().includes(p));
    }
  }

  filtered.forEach(task => createTaskElement(task));
  taskCount();
 
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter')
    addTask();
});
function addTask() {
  if (taskInput.value.trim() === "") return;
  const task = { id:Date.now,text: taskInput.value.trim(), completed: false };
  createTaskElement(task);
  saveTaskToLocal(task);
  taskInput.value = "";
}
function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""} />
    <span>${task.text}</span>
   
    <button class ="delete">Delete</button>
  `;


  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", function () {
    task.completed = this.checked;
    updateLocalStorage();
    if (this.checked) {
      li.classList.add("completed");
      completedList.appendChild(li);
    }
    else{li.classList.remove("completed");
      todoList.appendChild(li);
    
    }
  });

  if (task.completed) {
    li.classList.add("completed");
    completedList.appendChild(li);
  } else {
    todoList.appendChild(li);
  }

  // per-item delete button
  const deleteBtn = li.querySelector('.delete');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      li.remove();
      updateLocalStorage();
    });
  }
  taskCount();

}
function saveTaskToLocal(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskCount();
}
function updateLocalStorage() {
 const allTasks = [];
 completedList.querySelectorAll("li").forEach(li=>
  allTasks.push({
    text: li.querySelector("span").textContent,
    completed :true
  })
 );
   todoList.querySelectorAll("li").forEach(li => {
    allTasks.push({
      text: li.querySelector("span").textContent,
      completed:true
    });
  });
  

   taskCount;
  localStorage.setItem("tasks", JSON.stringify(allTasks));

}

function taskCount(){
  const todoCount = todoList.querySelectorAll("li").length;
  const completedCount = completedList.querySelectorAll("li").length;
  const total = todoCount + completedCount;
  if (totalTask) totalTask.textContent = String(total);
  
  
// Delete All button - clears all tasks 
deleteList.addEventListener("click", () => {
  const ok = confirm('Delete all tasks?');
  if (!ok) return;
  localStorage.removeItem('tasks');
  loadTasks();
});
}


