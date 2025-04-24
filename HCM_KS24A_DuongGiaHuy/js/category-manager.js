let projects=[];
const maxProjects=5;
let paginEl=document.getElementById("pagination");
let currentPage=1;
let totalPage=1;
let selectedIndex=-1;
const detailBtn=document.getElementsByClassName("project-detail");

if(!localStorage.getItem('projects')){
    localStorage.setItem('projects',JSON.stringify(projects));
}
else{
    projects=JSON.parse(localStorage.getItem('projects'));
}
//Xóa các hiển thị nhập lỗi
function clearErrors(){
    document.querySelectorAll(".blank-input").forEach(e => e.remove());
}
//Cập nhật lại dữ liệu trong localStorage
function updateData(){
    localStorage.setItem('projects',JSON.stringify(projects));
}
//Thêm dự án mới vào dữ liệu
function addProject(){
    totalPage=Math.ceil(projects.length/maxProjects);
    const projectName=document.getElementById('project-name').value.trim();
    const projectDescription=document.getElementById('project-desc').value.trim();
    clearErrors();
    if(nameExist=projects.some((project)=>project.name==projectName)){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Tên dự án đã tồn tại"
        document.getElementById("name").appendChild(blank);
        return;
    }
    if(!projectName){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("name").appendChild(blank);
        return;
    }
    if(!projectDescription){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("description").appendChild(blank);
        return;
    }
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("addModal")
      );
      modal.hide();
    projects.push({id:projects.length+1,name:projectName,description:projectDescription, tasks:[]});
    updateData();
    renderTable();
    renderPagin();
    document.getElementById('project-name').value="";
    document.getElementById('project-desc').value="";
}
//Render danh sách dự án hiển thị
function renderTable(){
    totalPage=Math.ceil(projects.length/maxProjects);
    const tableBody=document.getElementById("project-list");
    tableBody.innerHTML="";
    let data= projects.slice(currentPage*maxProjects-maxProjects,currentPage*maxProjects);
    for (let i=0;i<data.length;i++){
        let globalIndex = (currentPage - 1) * maxProjects + i;
        let row=document.createElement("tr");
        row.innerHTML=`
            <td style="width:10%">${data[i].id}</td>
            <td style="width:60%">${data[i].name}</td>
            <td style="width:30%">
                <button class="btn btn-danger" data-bs-toggle="modal" onclick="setIndex(${globalIndex})" data-bs-target="#deleteModal">XÓA</button>
                <button class="btn btn-warning" data-bs-toggle="modal" onclick="setValueModal(${globalIndex})" data-bs-target="#editModal">SỬA</button>
                <button class="btn btn-primary" onclick="goToDetail(${globalIndex})">CHI TIẾT</button>
            </td>
        `;
        tableBody.appendChild(row);
    };
}

function setIndex(index){
    selectedIndex=index;
}

function renderPagin() {
    let paginHtml = ``;
    for (let i = 1; i <= totalPage; i++) {
        paginHtml += `
        <button onclick="setPage(${i})" class=${(i == currentPage) ? "onPage" : ""}>${i}</button>`;
    }
    paginEl.innerHTML = `
    <button onclick="setPage(${currentPage - 1})"><</button>
    ${paginHtml}
    <button onclick="setPage(${currentPage + 1})">></button>`
}

function setPage(pageNumber) {
    if (pageNumber == 0) {
        pageNumber = 1;
    }
    if (pageNumber > totalPage) {
        pageNumber = totalPage;
    }
    currentPage = pageNumber;
    renderTable();
    renderPagin();
}
renderTable();
renderPagin();

function deleteProject(){
    if(selectedIndex!==-1){
    projects.splice(selectedIndex,1);
    projects.forEach((project,index)=>{
        project.id=index+1;
    });
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      );
      modal.hide();
    updateData();
    renderTable();
    renderPagin();
    selectedIndex=-1;
    }
}

function setValueModal(index){
    selectedIndex=index;
    const project=projects[index];
    document.getElementById("edit-name").value=project.name;
    document.getElementById("edit-desc").value=project.description;
}

function editProject(){
    const newName=document.getElementById("edit-name").value.trim();
    const newDesc=document.getElementById("edit-desc").value.trim();
    clearErrors();
    if(!newName){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("edit-name").appendChild(blank);
        return;
    }
    if(!newDesc){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("edit-desc").appendChild(blank);
        return;
    }
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("editModal")
      );
      modal.hide();
    projects[selectedIndex].name=newName;
    projects[selectedIndex].description=newDesc;
    updateData();
    renderTable();
    renderPagin();
    selectedIndex=-1;
    document.getElementById("edit-name").value="";
    document.getElementById("edit-desc").value="";
}

function searchProject(){
    let searchName=document.getElementById("search").value.trim();
    if(searchName==""){
        renderTable();
    }
    let searchLower=searchName.toLowerCase();
    let searchResult=projects.filter((project)=>{
        return project.name.toLowerCase().includes(searchLower);
    });
    const tableBody=document.getElementById("project-list");
    tableBody.innerHTML="";
    let data= searchResult.slice(currentPage*maxProjects-maxProjects,currentPage*maxProjects);
    for (let i=0;i<data.length;i++){
        let globalIndex = (currentPage - 1) * maxProjects + i;
        let row=document.createElement("tr");
        row.innerHTML=`
            <td style="width:10%">${data[i].id}</td>
            <td style="width:60%">${data[i].name}</td>
            <td style="width:30%">
                <button class="btn btn-danger" data-bs-toggle="modal" onclick="setIndex(${globalIndex})" data-bs-target="#deleteModal">XÓA</button>
                <button class="btn btn-warning" data-bs-toggle="modal" onclick="setValueModal(${globalIndex})" data-bs-target="#editModal">SỬA</button>
                <button class="btn btn-primary"  onclick="goToDetail(${globalIndex})">CHI TIẾT</button>
            </td>
        `;
        tableBody.appendChild(row);
    };
    totalPage=Math.ceil(searchResult.length/maxProjects);
    renderPagin();
}

function goToDetail(index){
    selectedIndex=index;
    const project=projects[selectedIndex];
    localStorage.setItem("selectedProject",JSON.stringify(project));
    window.location.href=`../pages/project-manager.html`;
}