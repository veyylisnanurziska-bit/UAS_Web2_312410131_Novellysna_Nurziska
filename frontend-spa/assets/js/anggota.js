// ======================================================
// ANGGOTA.JS
// ======================================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const modalAnggota = new bootstrap.Modal(
    document.getElementById("modalAnggota")
);

const tbody = document.getElementById("dataAnggota");

document.getElementById("btnTambah").addEventListener("click", () => {

    document.getElementById("judulModal").innerHTML = "Tambah Anggota";

    document.getElementById("idAnggota").value = "";
    document.getElementById("namaAnggota").value = "";
    document.getElementById("emailAnggota").value = "";
    document.getElementById("hpAnggota").value = "";

    modalAnggota.show();

});

document.getElementById("btnSimpan").addEventListener("click", simpanAnggota);

document.getElementById("logoutBtn").addEventListener("click", logout);

loadAnggota();


// ======================================================
// LOAD DATA
// ======================================================

async function loadAnggota() {

    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center">
                Loading...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(
            CONFIG.BASE_URL + CONFIG.ENDPOINTS.ANGGOTA,
            {
                headers: authHeader()
            }
        );

        const result = await response.json();

        tbody.innerHTML = "";

        const data = result.data;

        if (!data || data.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        Belum ada data.
                    </td>
                </tr>
            `;

            return;

        }

        let no = 1;

        data.forEach(item => {

            tbody.innerHTML += `
                <tr>

                    <td>${no++}</td>

                    <td>${item.nama_anggota}</td>

                    <td>${item.email}</td>

                    <td>${item.no_hp}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editAnggota(
                                ${item.id_anggota},
                                '${item.nama_anggota}',
                                '${item.email}',
                                '${item.no_hp}'
                            )">

                            Edit

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="hapusAnggota(${item.id_anggota})">

                            Hapus

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (err) {

        console.log(err);

        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-danger text-center">
                    Gagal mengambil data.
                </td>
            </tr>
        `;

    }

}


// ======================================================
// EDIT
// ======================================================

function editAnggota(id, nama, email, hp) {

    document.getElementById("judulModal").innerHTML = "Edit Anggota";

    document.getElementById("idAnggota").value = id;

    document.getElementById("namaAnggota").value = nama;

    document.getElementById("emailAnggota").value = email;

    document.getElementById("hpAnggota").value = hp;

    modalAnggota.show();

}


// ======================================================
// SIMPAN
// ======================================================

async function simpanAnggota() {

    const id = document.getElementById("idAnggota").value;

    const nama = document.getElementById("namaAnggota").value.trim();

    const email = document.getElementById("emailAnggota").value.trim();

    const hp = document.getElementById("hpAnggota").value.trim();

    if (nama === "" || email === "" || hp === "") {

        alert("Semua field wajib diisi");

        return;

    }

    const form = new URLSearchParams();

    form.append("nama_anggota", nama);
    form.append("email", email);
    form.append("no_hp", hp);

    let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.ANGGOTA;

    let method = "POST";

    if (id !== "") {

        url += "/" + id;

        method = "PUT";

    }

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                ...authHeader(),

                "Content-Type": "application/x-www-form-urlencoded"

            },

            body: form

        });

        const result = await response.json();

        alert(result.message);

        modalAnggota.hide();

        loadAnggota();

    } catch (err) {

        console.log(err);

        alert("Gagal menyimpan data.");

    }

}


// ======================================================
// HAPUS
// ======================================================

async function hapusAnggota(id) {

    if (!confirm("Yakin ingin menghapus data?")) {

        return;

    }

    try {

        const response = await fetch(

            CONFIG.BASE_URL +
            CONFIG.ENDPOINTS.ANGGOTA +
            "/" +
            id,

            {

                method: "DELETE",

                headers: authHeader()

            }

        );

        const result = await response.json();

        alert(result.message);

        loadAnggota();

    } catch (err) {

        console.log(err);

        alert("Gagal menghapus data.");

    }

}