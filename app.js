// define UI vars
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const form = document.querySelector('#task-form');

function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    // Create li element
    const li = `
      <li class="collection-item">${taskInput.value}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`;

    // Add task to UI
    taskList.insertAdjacentHTML('beforeend', li);

    // Add task to localStorage
    storeTasksInLocalStorage(taskInput.value);

    // Clear input field
    taskInput.value = '';

    e.preventDefault();
  }
}

function removeTasksFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    taskList.removeChild(e.target.parentElement.parentElement);
  }

  // Remove task from localStorage
  removeTasksFromLocalStorage(e.target.parentElement.parentElement);
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Clear task
function clearTasks(e) {
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
  clearTasksFromLocalStorage();
  e.preventDefault();
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  const items = document.querySelectorAll('.collection-item');
  items.forEach(function(task) {
    if (task.firstChild.textContent.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Display tasks
function displayTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // localStoraget tasks items are not empty array
  if (tasks.length !== 0) {
    tasks.forEach(function(task) {
      // Create li element
      const li = `
        <li class="collection-item">
          ${task}
          <a class="delete-item secondary-content">
            <i class="fa fa-remove"></i>
          </a>
        </li>
      `;

      // Add task to UI
      taskList.insertAdjacentHTML('beforeend', li);
    });
  }
}

function loadEventListener() {
  // Add a task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter task event
  filter.addEventListener('keyup', filterTasks);

  // Display tasks event
  document.addEventListener('DOMContentLoaded', displayTasks);
}

loadEventListener();
