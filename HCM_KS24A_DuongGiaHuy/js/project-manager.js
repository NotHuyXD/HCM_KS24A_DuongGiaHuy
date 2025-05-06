let users=JSON.parse(localStorage.getItem("users")) || [];
let selectedProject=JSON.parse(localStorage.getItem("selectedProject")) || [];
let projects=JSON.parse(localStorage.getItem("projects")) || [];
let selectedIndex=-1;
window.onload = function() {
    if(!users.some(user=>user.onLogin==true)){
      window.location.href="../pages/login.html";
      return;
    }
    if (selectedProject) {
    document.getElementById("taskboard-name").innerText = selectedProject.name;
    document.getElementById("taskboard-desc").innerText = selectedProject.description;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const assignerSelect = document.getElementById('task-assigner');
    const editAssigner = document.getElementById('edit-assigner');
    assignerSelect.innerHTML = users.map(user => 
      `<option value="${user.name}">${user.name}</option>`
    ).join('');
    editAssigner.innerHTML = users.map(user => 
      `<option value="${user.name}">${user.name}</option>`
    ).join('');
  });
  
  function clearErrors(){
    document.querySelectorAll(".blank-input").forEach(e => e.remove());
  }

  function updateData(){
    localStorage.setItem("selectedProject",JSON.stringify(selectedProject));
    const index = projects.findIndex(p => p.id === selectedProject.id);
    if (index !== -1) {
      projects[index] = selectedProject;
    }
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function addTask(){
    clearErrors();
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
            <tr class="statusTitle" onclick="toggleList('todo')">
              <td colspan="7"><h5>To Do</h5></td>
            </tr>`;

            inProgressBody.innerHTML=`
            <tr class="statusTitle" onclick="toggleList('inProgress')">
              <td colspan="7"><h5>In Progress</h5></td>
            </tr>`;

            completedBody.innerHTML=`
            <tr class="statusTitle" onclick="toggleList('completed')">
              <td colspan="7"><h5>Completed</h5></td>
            </tr>`;

    selectedProject.tasks.forEach((task,index)=>{
        let row=document.createElement("tr");
        let classPriority;
        let progress;

        if (task.priority === "Cao") {
        classPriority = "high";
        } else if (task.priority === "Trung Bình") {
        classPriority = "medium";
        } else {
        classPriority = "low";
        }

        if (task.progress === "onTime") {
          progress = "Đúng tiến độ";
          } else if (task.progress === "atRisk") {
          progress = "Có rủi ro";
          } else {
          progress = "Trễ hạn";
          }
        
        row.innerHTML=`
            <td style="width:20%">${task.name}</td>
            <td style="width:20%">${task.assigner}</td>
            <td style="width:10%" class="${classPriority}"><span>${task.priority}</span></td>
            <td style="width:10%">${task.beginDate}</td>
            <td style="width:10%">${task.endDate}</td>
            <td class="${task.progress}"><span>${progress}</span></td>
            <td>
              <button class="btn btn-danger" onclick="setIndex(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal">Xóa</button>
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
  clearErrors();
  const editName = document.getElementById('edit-name').value.trim();
  const editAssigner = document.getElementById('edit-assigner').value.trim();
  const editStatus= document.getElementById('edit-status').value.trim();
  const editBeginDate= document.getElementById('edit-beginDate').value.trim();
  const editEndDate= document.getElementById('edit-endDate').value.trim();
  const editPriority= document.getElementById('edit-priority').value.trim();
  const editProgress= document.getElementById('edit-progress').value.trim();
  if(selectedProject.tasks.some((task,index)=>task.name==editName && index!=selectedIndex)){
      let blank=document.createElement("p");
      blank.className="blank-input";
      blank.innerText="Tên nhiệm vụ đã tồn tại"
      document.getElementById("name").appendChild(blank);
      return;
  }
  if(!editName || !editAssigner || !editStatus || !editBeginDate || !editEndDate || !editPriority || !editProgress){
      alert("Phải nhập đầy đủ thông tin");
      return;
  }
  const modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();
  selectedProject.tasks[selectedIndex]=({id:selectedIndex ,name:editName,assigner:editAssigner,status:editStatus,beginDate:editBeginDate,endDate:editEndDate,priority:editPriority,progress:editProgress});
  renderTable();
  updateData();
}

function deleteTask(){
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteModal")
  );
  modal.hide();
  selectedProject.tasks.splice(selectedIndex,1);
  renderTable();
  updateData();
}

function searchProject(){
  let searchName=document.getElementById("search").value.trim();
  if(searchName==""){
      renderTable();
  }
  let searchLower=searchName.toLowerCase();
    const todoBody=document.getElementById("todoList");

    const inProgressBody=document.getElementById("inProgressList");

    const completedBody=document.getElementById("completedList");

            todoBody.innerHTML=`
            <tr class="statusTitle" onclick="toggleList('todo')">
              <td colspan="7"><h5>To Do</h5></td>
            </tr>`;

            inProgressBody.innerHTML=`
            <tr class="statusTitle" onclick="toggleList('inProgress')">
              <td colspan="7"><h5>In Progress</h5></td>
            </tr>`;

            completedBody.innerHTML=`
            <tr class="statusTitle" onclick="toggleList('completed')">
              <td colspan="7"><h5>Completed</h5></td>
            </tr>`;

    selectedProject.tasks.forEach((task,index)=>{
      if(task.name.toLowerCase().includes(searchLower)){
        let row=document.createElement("tr");
        let classPriority;
        let progress;

        if (task.priority === "Cao") {
        classPriority = "high";
        } else if (task.priority === "Trung Bình") {
        classPriority = "medium";
        } else {
        classPriority = "low";
        }

        if (task.progress === "onTime") {
          progress = "Đúng tiến độ";
          } else if (task.progress === "atRisk") {
          progress = "Có rủi ro";
          } else {
          progress = "Trễ hạn";
          }

        row.innerHTML=`
            <td style="width:10%">${task.name}</td>
            <td style="width:10%">${task.assigner}</td>
            <td class="${classPriority}">${task.priority}</td>
            <td>${task.beginDate}</td>
            <td>${task.endDate}</td>
            <td class="${task.priority}">${progress}</td>
            <td style="width:20%">
              <button class="btn btn-danger" onclick="setIndex(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal">Xóa</button>
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
      }
  });
}

const sortOption=document.getElementById("sort");
sortOption.addEventListener("change",function(){
  let sortValue=sortOption.value;
  if(sortValue=="all"){
    renderTable();
  }
  else if(sortValue=="byPriority"){
    selectedProject.tasks.sort((a,b)=>{
      if(a.priority=="Cao" && b.priority=="Trung Bình"){
        return -1;
      }
      else if(a.priority=="Cao" && b.priority=="Thấp"){
        return -1;
      }
      else if(a.priority=="Trung Bình" && b.priority=="Thấp"){
        return -1;
      }
      else if(a.priority=="Thấp" && b.priority=="Cao"){
        return 1;
      }
      else if(a.priority=="Thấp" && b.priority=="Trung Bình"){
        return 1;
      }
      else{
        return 0;
      }
    })
    renderTable();
  }
})

renderTable();

updateData();