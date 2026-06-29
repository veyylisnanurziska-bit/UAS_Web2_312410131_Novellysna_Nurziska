const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("username").innerHTML = user.username;
}

document.getElementById("logoutBtn").addEventListener("click", logout);

// ==========================
// LOAD DASHBOARD
// ==========================

async function loadDashboard() {

    try {

        const res = await fetch(
            CONFIG.BASE_URL + "dashboard",
            {
                headers: authHeader()
            }
        );

        const result = await res.json();

        if (result.status) {

            document.getElementById("countBuku").innerText = result.data.buku;
            document.getElementById("countKategori").innerText = result.data.kategori;
            document.getElementById("countPenulis").innerText = result.data.penulis;
            document.getElementById("countAnggota").innerText = result.data.anggota;

        }

    } catch (err) {

        console.error(err);

        alert("Gagal mengambil data dashboard.");

    }

}

loadDashboard();