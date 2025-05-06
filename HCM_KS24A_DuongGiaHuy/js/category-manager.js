initSampleData();
let users = JSON.parse(localStorage.getItem('users')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
const maxProjects=5;
let paginEl=document.getElementById("pagination");
let currentPage=1;
let totalPage=1;
let selectedIndex=-1;
  
const detailBtn=document.getElementsByClassName("project-detail");

window.onload=function(){
    if(!users.some(user=>user.onLogin==true)){
        window.location.href="../pages/login.html";
        return;
      }
}


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

    if(projectName.length>30){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được vượt quá 30 ký tự"
        document.getElementById("name").appendChild(blank);
        return;
    }

    if(projectName.length<4){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Phải có tối thiểu 10 ký tự"
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

    if(projectDescription.length>100){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được vượt quá 100 ký tự"
        document.getElementById("description").appendChild(blank);
        return;
    }

    if(projectDescription.length<4){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Phải có tối thiểu 10 ký tự"
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
    let paginHtml = '';

    paginHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="setPage(${currentPage - 1})">Previous</a>
        </li>`;

    for (let i = 1; i <= totalPage; i++) {
        paginHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="setPage(${i})">${i}</a>
            </li>`;
    }

    paginHtml += `
        <li class="page-item ${currentPage === totalPage ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="setPage(${currentPage + 1})">Next</a>
        </li>`;

    paginEl.innerHTML = `<ul class="pagination">${paginHtml}</ul>`;
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

function initSampleData() {

    if (!localStorage.getItem("projects")) {
        const defaultProjects = [
            {
                id: 1,
                name: "Website Công ty",
                description: "Phát triển website cho công ty ABC",
                tasks: [
                    {
                        id: 1,
                        name: "Thiết kế giao diện",
                        assigner: "Nguyễn Văn A",
                        status: "todo",
                        beginDate: "2025-05-01",
                        endDate: "2025-05-05",
                        priority: "Cao",
                        progress: "onTime"
                    },
                    {
                        id: 2,
                        name: "Lập trình frontend",
                        assigner: "Trần Thị B",
                        status: "inProgress",
                        beginDate: "2025-05-02",
                        endDate: "2025-05-10",
                        priority: "Trung Bình",
                        progress: "atRisk"
                    }
                ]
            },
            {
                id: 2,
                name: "App Quản lý công việc",
                description: "Ứng dụng quản lý dự án nội bộ",
                tasks: [
                    {
                        id: 1,
                        name: "Phân tích yêu cầu",
                        assigner: "Phạm Thị D",
                        status: "completed",
                        beginDate: "2025-04-20",
                        endDate: "2025-04-22",
                        priority: "Cao",
                        progress: "onTime"
                    }
                ]
            },
            {
                id: 3,
                name: "Thiết kế UI trang web",
                description: "UI website đẹp mắt và dễ tiếp cận",
                tasks: [
                    {
                        id: 1,
                        name: "Lên ý tưởng",
                        assigner: "Dương Gia Huy",
                        status: "completed",
                        beginDate: "2025-05-24",
                        endDate: "2025-05-30",
                        priority: "Cao",
                        progress: "onTime"
                    },
                    {
                        id: 2,
                        name: "Thiết kế",
                        assigner: "Dương Gia Huy",
                        status: "inProgress",
                        beginDate: "2025-06-02",
                        endDate: "2025-06-05",
                        priority: "Cao",
                        progress: "onTime"
                    }
                ]
            }
        ];
        localStorage.setItem("projects", JSON.stringify(defaultProjects));
    }
}
