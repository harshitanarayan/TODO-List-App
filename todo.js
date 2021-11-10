let tasks = [];
//All the tasks added in the todo list 
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task) {
    //li tag created corresponding to each task
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}"> ${task.text} </label>
        <img src="https://cdn-icons.flaticon.com/png/128/484/premium/484611.png?token=exp=1636504146~hmac=82ec53622be1af5d91cd61681e7fb5e3" class="delete" data-id="${task.id}" />`; //data-id is required in order to know which task needs to be deleted

        //append list item to the tasksList ul 
        tasksList.appendChild(li);
}


function renderList () {
    //Remove the entire list from the screen
    tasksList.innerHTML = "";

    //Take each task and append it to the list
    for(let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

//Toggle task means changing the value to the opposite of what is currently present i.e done: !done (if donen false then change it to true)
function toggleTask (taskID) {
    // tasks.map((task) => {
    //     if(task.id === taskID) {
    //         task.done = !done;
    //     }
    // });
    const task = tasks.filter((task) => {
        return task.id === taskID;
    });

    if(task.length > 0) {
       const currentTask = task[0];
       
       currentTask.done = !currentTask.done;
       renderList();
       showNotification("Task toggled successfully!");
       return;
    }

    showNotification("Could not toggle the task.");
}

function deleteTask (taskID) {
    //Fetch task using the taskId and then delete that task
    //MY APPROACH
    // for(let task in tasks) {
    //     if(tasks[task].id === taskID) {
    //         tasks.splice(task, 1);
    //     }
    // }
    //CN APPROACH
    const newTasks = tasks.filter((task) => {
        return task.id !== taskID;
    });
    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully!");
}

function addTask (task) {
    //If task is present, add task to the tasks array 
    if(tasks) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully!");
        return;
    }

    showNotification("Task cannot be added.");
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(event) {
    //After typing the task, when the user presses enter 
    if(event.key === 'Enter') {
        //Collect the task 
        const text = event.target.value;
        console.log(text);
        
        //Show notification if the user pressed enter without adding task
        if(!text) {
            showNotification("Task cannot be empty");
            return;
        }

        //Create the task object
        const task = {
            text, //shorthand for text: text
            id : Date.now().toString(),
            done: false
        }

        //Empty the input box after the task object is created
        event.target.value = "";
        addTask(task);
    }
}

addTaskInput.addEventListener('keypress', handleInputKeypress);