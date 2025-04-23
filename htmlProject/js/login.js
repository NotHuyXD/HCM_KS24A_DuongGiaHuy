function loginAccount() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        window.location.href = "../pages/category-manager.html";
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
}