let users=[];
if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify(users));
}
else{   
    users=JSON.parse(localStorage.getItem("users"));
}

function clearErrors(){
    document.querySelectorAll(".blank-input").forEach(e => e.remove());
}

function updateData(){
    localStorage.setItem("users",JSON.stringify(users));
}
function registerAccount() {
    clearErrors();
    const email = document.getElementById("emailRegister").value.trim();
    const password = document.getElementById("passwordRegister").value.trim();
    const username = document.getElementById("nameRegister").value.trim();
    const confirmPassword=document.getElementById("confirmPasswordRegister").value.trim();
    if (!username) {
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("nameInput").appendChild(blank);
        return;
        return;
    }
    if(!email){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("emailInput").appendChild(blank);
        return;
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Email không hợp lệ"
        document.getElementById("emailInput").appendChild(blank);
        return;
    }

    if (password.length ==0){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("passwordInput").appendChild(blank);
        return;
    }

    if( password.length <8){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Mật khẩu phải có ít nhất 8 ký tự"
        document.getElementById("passwordInput").appendChild(blank);
        return;
    }

    const emailExist = users.some(user => user.email === email);

    if (emailExist) {
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Email đã tồn tại"
        document.getElementById("emailInput").appendChild(blank);
        return;
        return;
    }

    if( password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    else {
        users.push({ name:username,email:email, password:password ,onLogin:false});
        localStorage.setItem("users", JSON.stringify(users));
        updateData();
        alert("Đăng ký thành công! Quay lại đăng nhập.");
        window.location.href = "../pages/login.html";
    }
}

    