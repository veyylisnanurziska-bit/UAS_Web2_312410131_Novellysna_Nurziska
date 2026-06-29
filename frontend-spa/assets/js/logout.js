function logout() {

    if (!confirm("Yakin ingin logout?")) {
        return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "../login.html";

}