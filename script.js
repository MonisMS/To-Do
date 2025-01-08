document.addEventListener('DOMContentLoaded',()=>{
  const todoInput=document.getElementById("todo-input");
const addTaskbtn=document.getElementById("add-task-btn");
const todoList=document.getElementById("todo-list");


let tasks=JSON.parse(localStorage.getItem('allTasks')) || [];   
tasks.forEach(task => renderTask(task));
        

addTaskbtn.addEventListener('click',()=>{
  const taskTest=todoInput.value.trim();         //to store the entered value
  if(taskTest=="") return;                       
  const newTask ={
    id: Date.now(),                              //assign a unique id to task
    text:taskTest,
    isCompleted:false,


  };
  tasks.push(newTask);
  saveTask();
  renderTask(newTask);
  todoInput.value="";                              //clear the input feild
  console.log(tasks);
   
});

function renderTask(task){
  const li=document.createElement('li');
  li.setAttribute('data-id',task.id);
  if(task.isCompleted) li.classList.add("completed");
  li.innerHTML = `<span>${task.text}</span>
  <button>Delete</button>`;
li.addEventListener('click',(e)=>{
  if(e.target.tagName === 'BUTTON') return;
  task.isCompleted=!task.isCompleted
  li.classList.toggle('completed')
  saveTask()

});
li.querySelector('button').addEventListener('click',(e)=>{
  e.stopPropagation()     //prevent  toggle from firing
  tasks= tasks.filter(t=>t.id != task.id)
  li.remove();
  saveTask();
});



  todoList.appendChild(li);
  
}


function saveTask(){
  localStorage.setItem("allTasks",JSON.stringify(tasks) );
}
})