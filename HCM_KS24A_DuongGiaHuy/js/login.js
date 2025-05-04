let users =[];
if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify(users));
}
else{
    users=JSON.parse(localStorage.getItem("users"));
}
function updateData(){
    localStorage.setItem("users",JSON.stringify(users));
}
window.onload = function() {
    users.forEach(user=>{
        user.onLogin=false;
    })
    updateData();
}
function loginAccount() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    let user = users.find(user=> user.email === email && user.password === password);
        if(user){
            user.onLogin=true;
            updateData();
            window.location.href = "../pages/category-manager.html";
        }
        else {
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
            return;
        }
}