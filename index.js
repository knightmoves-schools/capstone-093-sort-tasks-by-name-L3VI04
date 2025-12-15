class Task{
    constructor(description, status){
       this.description = description;
       this.status = status;
    }
}

function bubbleSort(items) {
    let n = items.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (items[j].task.description > items[j + 1].task.description) {
                let temp = items[j];
                items[j] = items[j + 1];
                items[j + 1] = temp;
            }
        }
    }
}

let tasks = [
    new Task('pack spikes for track meet', 'todo'), 
    new Task('make my bed', 'todo'), 
    new Task('walk the dog', 'todo'),
    new Task('write draft english paper', 'doing'),
    new Task('sanding art project', 'doing'),
    new Task('wash the dishes', 'done'),
    new Task('finish math homework', 'done'),
    new Task('practice my trumpet', 'done')];
            
function drawCard(index, task){
    return `<div id="task-${index}" class="card">
        <div class="task-menu">
            <div class="menu-bar  ${task.status}">...</div>
            <ul class="task-menu-items">
                <li><a id="edit-task-${index}" onClick="editTask(${index}); return false;">Edit</a></li>
                <li><a id="delete-task-${index}" onClick="deleteTask(${index}); return false;">Delete</a></li>
            </ul>
        </div>
        ${task.description}
    </div>`
}

function drawTodoCards(){
    let todoTasks = [];
    tasks.forEach((task, index) => {
        if(task.status == 'todo'){
            todoTasks.push({task, index});
        }
    });
    bubbleSort(todoTasks);
    let output = '';
    todoTasks.forEach(item => {
        output += drawCard(item.index, item.task);
    });
    
    return output;
}

function drawDoingCards(){
    let doingTasks = [];
    tasks.forEach((task, index) => {
        if(task.status == 'doing'){
            doingTasks.push({task, index});
        }
    });
    bubbleSort(doingTasks);
    let output = '';
    doingTasks.forEach(item => {
        output += drawCard(item.index, item.task);
    });
    
    return output;
}



function drawDoneCards(){
    let doneTasks = [];
    tasks.forEach((task, index) => {
        if(task.status == 'done'){
            doneTasks.push({task, index});
        }
    });
    bubbleSort(doneTasks);
    let output = '';
    doneTasks.forEach(item => {
        output += drawCard(item.index, item.task);
    });
    
    return output;
}

function drawAllCards(){
    document.getElementById('todo-cards').innerHTML = drawTodoCards();
    document.getElementById('doing-cards').innerHTML = drawDoingCards();
    document.getElementById('done-cards').innerHTML = drawDoneCards();
}

function createOrUpdateTask(){
    let id = document.getElementById('task-id').value;
    let description = document.getElementById('task-description').value;
    let status = document.getElementById('task-status').value;
    
    let task;
    if(id){
        task = tasks[id];
        task.description = description;
        task.status = status;
    }else{
        task = new Task(description, status);
        tasks.push(task);
    }
    
    document.getElementById('task-id').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-status').value = 'todo';
    document.getElementById('add-task').innerHTML = 'Add';
    
    drawAllCards();
}

function deleteTask(id){
    tasks.splice(id, 1);
    
    drawAllCards();
}

function editTask(id){
    let task = tasks[id];
    
    document.getElementById('task-id').value = id;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-status').value = task.status;
    document.getElementById('add-task').innerHTML = 'Update';
}

drawAllCards();
