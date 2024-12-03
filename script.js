// Global Variables
let currentUser = null;
let tasks = [];
let currentCategory = '';

// Check for saved user data
let users = JSON.parse(localStorage.getItem('users')) || {};

// Check for saved tasks
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

// DOM Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const taskTitleInput = document.getElementById('task-title');
const reminderTimeInput = document.getElementById('reminder-time');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const welcomeUser = document.getElementById('welcome-user');

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Signup Logic
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (users[username]) {
        alert("User already exists!");
        return;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful! You can now log in.");
});

// Login Logic
loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (users[username] && users[username] === password) {
        currentUser = username;
        welcomeUser.textContent = currentUser;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
        loadTasks();
    } else {
        alert("Invalid username or password.");
    }
});

// Add Task Logic
addTaskBtn.addEventListener('click', () => {
    const taskTitle = taskTitleInput.value;
    const reminderTime = reminderTimeInput.value;
    const priority = prioritySelect.value;

    if (taskTitle && reminderTime) {
        const task = {
            id: new Date().getTime(),
            title: taskTitle,
            category: currentCategory || 'Work',
            reminderTime: reminderTime,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        saveTasks();
        renderTasks();
        taskTitleInput.value = '';
        reminderTimeInput.value = '';
    } else {
        alert("Please enter a task title and reminder time.");
    }
});

// Render Tasks Logic
function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => task.category === currentCategory || currentCategory === '');
    filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'todo-item';
        taskDiv.innerHTML = `
            <span>${task.title} - <span class="priority">${task.priority}</span> - Reminder: ${task.reminderTime}</span>
            <span>Status: ${task.completed ? 'Completed' : 'Pending'}</span>
            <button onclick="completeTask(${task.id})">Complete</button>
        `;
        taskList.appendChild(taskDiv);

        // Notification for reminder
        if (!task.completed && new Date(task.reminderTime) <= new Date()) {
            alert(`Reminder for task: ${task.title}`);
        }
    });
}

// Complete Task Logic
function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        saveTasks();
        renderTasks();
        alert(`Task "${task.title}" completed!`);
    }
}

// Filter Tasks by Category
function filterTasks(category) {
    currentCategory = category;
    renderTasks();
}

// Save Tasks to localStorage
function saveTasks() {
       localStorage.setItem('tasks',
    )
}