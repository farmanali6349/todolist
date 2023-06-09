const title = document.getElementById('title');
const description = document.getElementById('description');
const createBtn = document.getElementById('create-btn');
const alertPara = document.querySelector('.create button + p');
const tasks = document.getElementsByClassName('tasks')[0];
const create = document.getElementsByClassName('create')[0];
const task = document.querySelectorAll('.right .tasks .task');


// VIEW SECTION
const view = document.querySelector('.view');
const viewH2 = document.querySelector('.view h2');
const viewPara = document.querySelector('.view .task p');
const createNewTask = document.getElementById('create-new-task');

// TASK KEY
let key;
let encodedKey;

let createTask = async () => {
    key = title.value;
    encodedKey = encodeURIComponent(key);
    
    if (title.value === '' && description.value == '') {
        alertPara.textContent = 'Please enter title and description.'
    } else if (title.value === '') {
        alertPara.textContent = 'Please enter title.'
    } else if (description.value === '') {
        alertPara.textContent = 'Please enter description.';
    } else if(title.value.includes("'")) {
        alertPara.textContent = 'Do not include characters like \' and in the title.';
    } else {
        alertPara.textContent = ''
        localStorage.setItem(encodedKey, description.value);
        title.value = '';
        description.value = '';
        alertPara.textContent = 'Task added.'
        refreshTasks();
    }

    setTimeout(() => {
        alertPara.textContent = '';
    }, 2000)

}

// REFRESH THE TASK LIST ON RIGHT
let refreshTasks = async () => {
    tasks.innerHTML = '';

    const titles = Object.keys(localStorage);
    const length = localStorage.length;
    const messagePara = document.querySelector('p.message');

    if(length == 0) {
        messagePara.textContent = 'Create a task, you currently have no task.'
    } else {
        messagePara.textContent = ''
    }



    for (let i = 0; i < length; i++) {
        // TASK
        const task = document.createElement('div');
        const title = titles[i];
        task.classList.add('task');
        task.innerHTML = `<h4>${decodeURIComponent(title)}</h4> <button id="delete-btn" onclick="delTask(event, '${title}')"><img src="RESOURCES/delete.svg" alt="delete"></button>`;
        tasks.appendChild(task);


        task.onclick = async function viewTask(event) {
            viewH2.textContent = decodeURIComponent(title);
            viewPara.textContent = localStorage.getItem(title);
            task.style.backgroundColor = 'rgba(58, 56, 56, 0.078)';

            if(localStorage.length >= 1) {
                let taskList = document.querySelectorAll('.right .task');
                for(let j=0; j<taskList.length; j++) {

                    if (taskList[j] != task) {
                        taskList[j].style.backgroundColor = 'white';
                    }
                }
            }




            create.style.display = 'none';
            view.style.display = 'block';
            createNewTask.style.display = 'block';
            event.stopPropagation();
        };
    }
}

// WINDOW RELOAD
window.onload = () => {
    refreshTasks();
    refreshView();
    createTaskView();
}

// DELETE TASK
let delTask = async (event, value) => {
    localStorage.removeItem (value);
    event.stopPropagation();
    refreshTasks();
    refreshView();
}

// REFRESH VIEW
let refreshView = async () => {
    if (localStorage.length >= 1) {
        const keys = Object.keys(localStorage);
        viewH2.textContent = decodeURIComponent(keys[0]);
        viewPara.textContent = localStorage.getItem(keys[0]);
    } else {
        viewH2.textContent = 'No title';
        viewPara.textContent = 'No Description.'
    }
}


// CREATE TASK EVENTS
createBtn.addEventListener('click', createTask);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        createTask();
    }
})

// TASK CREATION VIEW 
let createTaskView = async (event) => {
    view.style.display = 'none';
    create.style.display = 'block';
    createNewTask.style.display = 'none';


    if(localStorage.length >= 1){
        refreshTasks();
    }
}

// Adding event to the button
createNewTask.addEventListener('click', createTaskView, event);

