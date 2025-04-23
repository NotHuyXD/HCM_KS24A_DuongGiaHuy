      
function registerAccount() {
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

    if (password.length ==0){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("passwordInput").appendChild(blank);
        return;
    }

    if( password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    if( password.length <8){
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExist = users.some(user => user.email === email);
    if (emailExist) {
        alert("Email đã tồn tại!");
        return;
    }
    else {
        users.push({ email:email, password:password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công! Quay lại đăng nhập.");
        window.location.href = "../pages/login.html";
    }
}

    