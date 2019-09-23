// Display input
document.addEventListener('DOMContentLoaded', function() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function(task) {
    // Add tasks to UI
    const li = `
      <li class="collection-item">
        ${task}
        <a href="#" class="delete-item secondary-content">
          <i class="fa fa-remove"></i>
        </a>
      </li>
    `;

    const taskList = document.querySelector('.collection');
    taskList.insertAdjacentHTML('afterbegin', li);
  });
});

// Add a task
document.querySelector('form').addEventListener('submit', function(e) {
  // Get input value
  const input = document.querySelector('#task');

  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  if (input.value === '') {
    console.log('Please fill input field');
  } else {
    tasks.push(input.value);

    // Add a task to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add tasks to UI
    const li = `
      <li class="collection-item">
        ${input.value}
        <a href="#" class="delete-item secondary-content">
          <i class="fa fa-remove"></i>
        </a>
      </li>
    `;

    const taskList = document.querySelector('.collection');
    taskList.insertAdjacentHTML('afterbegin', li);

    // Clear input field
    input.value = '';
  }

  // Prevent default submit event
  e.preventDefault();
});

document.querySelector('.card-action').addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('fa-remove')) {
    // Remove a task from UI
    e.target.parentElement.parentElement.remove();

    // Remove a task from storage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task) {
      if (e.target.parentElement.parentElement.innerText.includes(task)) {
        tasks.pop(task);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else if (e.target.classList.contains('clear-tasks')) {
    const tasks = document.querySelectorAll('.collection-item');
    const tasksArr = Array.from(tasks);

    // Remove all tasks from UI
    tasksArr.forEach(function(task) {
      task.remove();
    });

    // Remove tasks from storage
    localStorage.removeItem('tasks');
  }
});
