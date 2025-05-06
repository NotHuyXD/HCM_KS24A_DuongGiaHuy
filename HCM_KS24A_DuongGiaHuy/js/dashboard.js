let users = JSON.parse(localStorage.getItem('users')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentUser;
const taskTable = document.getElementById("task-table");

window.onload = function() {
  if(!users.some(user=>user.onLogin==true)){
    window.location.href="../pages/login.html";
    return;
  }
}

users.forEach(user => {
  if (user.onLogin) {
    currentUser = user;
    console.log(currentUser);
  }
});

projects.forEach((project, index) => {
  const relatedTasks = project.tasks.filter(task => task.assigner === currentUser.name);
  if (relatedTasks.length === 0) return;

  const section = document.createElement("tbody");
  section.className = "task-section";
  section.id = `project-${index}`;

  // Dòng tiêu đề của project
  section.innerHTML += `
    <tr class="project-title" onclick="toggleList(${index})">
      <td colspan="6"><strong>${project.name}</strong></td>
    </tr>
  `;

  // Thêm từng task của project
  relatedTasks.forEach((task) => {
        let classPriority;
        let progress;
        let status;

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

        if (task.status=="inProgress"){
          status="Đang thực hiện";
        } else if (task.status=="completed"){
          status="Đã hoàn thành";
        } else {
          status="Chưa bắt đầu";
        }
    section.innerHTML += `
      <tr class="task-${project.id-1}">
        <td>${task.name}</td>
        <td class="${classPriority}"><span>${task.priority}</span></td>
        <td>${status}</td>
        <td>${task.beginDate}</td>
        <td>${task.endDate}</td>
        <td class="${task.progress}"><span>${progress}</span></td>
      </tr>
    `;
  });

  taskTable.appendChild(section);
});

function toggleList(index) {
    const rows = document.querySelectorAll(`.task-${index}`);
    rows.forEach(row => {
      row.style.display = row.style.display === "none" ? "table-row" : "none";
    });
  }
  
