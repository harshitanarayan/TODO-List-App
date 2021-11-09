const tasks = [];
//All the tasks added in the todo list 
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function renderList () {}

function markTaskAsComplete (taskId) {}

function deleteTask (taskId) {}

function addTask (task) {}

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