let projects=[];
const maxProjects=5;
let paginEl=document.getElementById("pagination");
let currentPage=1;
let totalPage=1;
let selectedIndex=-1;

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
    projects.push({id:projects.length+1,name:projectName,description:projectDescription});
    updateData();
    renderTable();
    renderPagin();
    document.getElementById('project-name').value="";
    document.getElementById('project-desc').value="";
    clearErrors();
}
//Render danh sách dự án hiển thị
function renderTable(){
    totalPage=Math.ceil(projects.length/maxProjects);
    const tableBody=document.getElementById("project-list");
    tableBody.innerHTML="";
    let data= projects.slice(currentPage*maxProjects-maxProjects,currentPage*maxProjects);
    for (let i=0;i<data.length;i++){
        let row=document.createElement("tr");
        row.innerHTML=`
            <td style="width:10%">${data[i].id}</td>
            <td style="width:60%">${data[i].name}</td>
            <td style="width:30%">
                <button class="btn btn-danger" data-bs-toggle="modal" onclick="setIndex(${i})" data-bs-target="#deleteModal">XÓA</button>
                <button class="btn btn-warning" onclick="editProject(${i})">SỬA</button>
                <button class="btn btn-primary" onclick="window.location.href="../pages/project-manager.html";">CHI TIẾT</button>
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
    <button onclick="setPage(${currentPage - 1})">Previous</button>
    ${paginHtml}
    <button onclick="setPage(${currentPage + 1})">Next</button>`
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
    updateData();
    renderTable();
    renderPagin();
    selectedIndex=-1;
    }
}
