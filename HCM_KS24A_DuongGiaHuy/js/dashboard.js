let users = JSON.parse(localStorage.getItem('users')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentUser;
const taskTable = document.getElementById("task-table");

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
    section.innerHTML += `
      <tr class="task-${project.id-1}">
        <td>${task.name}</td>
        <td>${task.status}</td>
        <td>${task.priority}</td>
        <td>${task.beginDate}</td>
        <td>${task.endDate}</td>
        <td>${task.progress}</td>
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
  
