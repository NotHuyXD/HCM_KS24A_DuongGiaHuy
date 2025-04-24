let users=JSON.parse(localStorage.getItem("users")) || [];
let selectedProject=JSON.parse(localStorage.getItem("selectedProject")) || [];
let projects=JSON.parse(localStorage.getItem("projects")) || [];
let selectedIndex=-1;
window.onload = function() {
    if (selectedProject) {
    document.getElementById("taskboard-name").innerText = selectedProject.name;
    document.getElementById("taskboard-desc").innerText = selectedProject.description;
    }
  }
  window.addEventListener('DOMContentLoaded', () => {
    const assignerSelect = document.getElementById('task-assigner');
    assignerSelect.innerHTML = users.map(user => 
      `<option value="${user.name}">${user.name}</option>`
    ).join('');
  });
  
  function updateData(){
    localStorage.setItem("selectedProject",JSON.stringify(selectedProject));
    const index = projects.findIndex(p => p.id === selectedProject.id);
    if (index !== -1) {
      projects[index] = selectedProject;
    }
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  function addTask(){
    console.log("clicked");
    const taskName = document.getElementById('task-name').value.trim();
    const taskAssigner = document.getElementById('task-assigner').value.trim();
    const taskStatus= document.getElementById('task-status').value.trim();
    const taskBeginDate= document.getElementById('task-beginDate').value.trim();
    const taskEndDate= document.getElementById('task-endDate').value.trim();
    const taskPriority= document.getElementById('task-priority').value.trim();
    const taskProgress= document.getElementById('task-progress').value.trim();
    if(selectedProject.tasks.some((task)=>task.name==taskName)){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Tên nhiệm vụ đã tồn tại"
        document.getElementById("name").appendChild(blank);
        return;
    }
    if(!taskName || !taskAssigner || !taskStatus || !taskBeginDate || !taskEndDate || !taskPriority || !taskProgress){
        alert("Phải nhập đầy đủ thông tin");
        return;
    }
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("addModal")
      );
      modal.hide();
    selectedProject.tasks.push({id:selectedProject.tasks.length+1,name:taskName,assigner:taskAssigner,status:taskStatus,beginDate:taskBeginDate,endDate:taskEndDate,priority:taskPriority,progress:taskProgress});
    renderTable();
    updateData();
    document.getElementById('task-name').value="";
    document.getElementById('task-assigner').value="";
    document.getElementById('task-status').value="";
    document.getElementById('task-beginDate').value="";
    document.getElementById('task-endDate').value="";
    document.getElementById('task-priority').value="";
    document.getElementById('task-progress').value="";
  }
  function renderTable(){
    const todoBody=document.getElementById("todoList");

    const inProgressBody=document.getElementById("inProgressList");

    const completedBody=document.getElementById("completedList");

            todoBody.innerHTML=`
            <tr>
              <td><h5>To Do</h5></td>
            </tr>`;

            inProgressBody.innerHTML=`
            <tr>
              <td><h5>In Progress</h5></td>
            </tr>`;

            completedBody.innerHTML=`
            <tr>
              <td><h5>Completed</h5></td>
            </tr>`;

    selectedProject.tasks.forEach((task,index)=>{
        let row=document.createElement("tr");

        row.innerHTML=`
            <td style="width:20%">${task.name}</td>
            <td style="width:20%">${task.assigner}</td>
            <td style="width:10%">${task.priority}</td>
            <td style="width:10%">${task.beginDate}</td>
            <td style="width:10%">${task.endDate}</td>
            <td style="width:10%">${task.progress}</td>
            <td style="width:20%">
              <button class="btn btn-danger" onclick="setIndex(${index})">Xóa</button>
              <button class="btn btn-primary" onclick="setValueModal(${index})" data-bs-toggle="modal" data-bs-target="#editModal">Sửa</button>
            </td>
        `;

        if(task.status=="todo"){
          row.className="todo"
          todoBody.appendChild(row);
        }

        else if(task.status=="inProgress"){
          row.className="inProgress"
          inProgressBody.appendChild(row);
        }

        else{
          row.className="completed"
          completedBody.appendChild(row);
        }
  })
}
function toggleList(section){
  const rows=document.querySelectorAll(`.${section}`);
  rows.forEach(row => {
    row.style.display = row.style.display === "none" ? "table-row" : "none";
  });
  window.onload = function () {
    document.querySelectorAll('.task-row').forEach(row => {
      row.style.display = 'none';
    });
  }
}

function setIndex(index){
  selectedIndex=index;
}

function setValueModal(index){
  selectedIndex=index;
  const editTask=selectedProject.tasks[selectedIndex];
  document.getElementById('edit-name').value=editTask.name;
  document.getElementById('edit-assigner').value=editTask.assigner;
  document.getElementById('edit-status').value=editTask.status;
  document.getElementById('edit-beginDate').value=editTask.beginDate;
  document.getElementById('edit-endDate').value=editTask.endDate;
  document.getElementById('edit-priority').value=editTask.priority;
  document.getElementById('edit-progress').value=editTask.progress;
}

function editTask(){
  const taskName = document.getElementById('edit-name').value.trim();
  const taskAssigner = document.getElementById('edit-assigner').value.trim();
  const taskStatus= document.getElementById('edit-status').value.trim();
  const taskBeginDate= document.getElementById('edit-beginDate').value.trim();
  const taskEndDate= document.getElementById('edit-endDate').value.trim();
  const taskPriority= document.getElementById('edit-priority').value.trim();
  const taskProgress= document.getElementById('edit-progress').value.trim();
  if(selectedProject.tasks.some((task)=>task.name==taskName)){
      let blank=document.createElement("p");
      blank.className="blank-input";
      blank.innerText="Tên nhiệm vụ đã tồn tại"
      document.getElementById("name").appendChild(blank);
      return;
  }
  if(!taskName || !taskAssigner || !taskStatus || !taskBeginDate || !taskEndDate || !taskPriority || !taskProgress){
      alert("Phải nhập đầy đủ thông tin");
      return;
  }
  const modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();
  selectedProject.tasks[selectedIndex]=({id:selectedIndex ,name:taskName,assigner:taskAssigner,status:taskStatus,beginDate:taskBeginDate,endDate:taskEndDate,priority:taskPriority,progress:taskProgress});
  renderTable();
  updateData();
}
renderTable();
updateData();