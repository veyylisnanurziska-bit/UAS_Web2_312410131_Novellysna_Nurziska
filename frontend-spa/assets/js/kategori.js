// ======================================================
// KATEGORI.JS
// ======================================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const modalKategori = new bootstrap.Modal(
    document.getElementById("modalKategori")
);

const tbody = document.getElementById("dataKategori");

document.getElementById("btnTambah").addEventListener("click", () => {

    document.getElementById("judulModal").innerHTML = "Tambah Kategori";

    document.getElementById("idKategori").value = "";

    document.getElementById("namaKategori").value = "";

    modalKategori.show();

});

document.getElementById("btnSimpan").addEventListener("click", simpanKategori);

document.getElementById("logoutBtn").addEventListener("click", logout);

loadKategori();


// ======================================================
// LOAD DATA
// ======================================================

async function loadKategori() {

    tbody.innerHTML = `
        <tr>
            <td colspan="3" class="text-center">
                <tbody id="dataKategori">
                <tr>
                <td colspan="3" class="text-center py-5">
                <div class="spinner-border text-danger"></div>
                </td>
                </tr>
                </tbody>
            </td>
        </tr>
    `;

    try {

        const response = await fetch(
            CONFIG.BASE_URL + CONFIG.ENDPOINTS.KATEGORI,
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
                    <td colspan="3" class="text-center">
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

    <td>

        ${no++}

    </td>

    <td>

        <span class="badge bg-light text-dark p-2 rounded-pill">

            📂 ${item.nama_kategori}

        </span>

    </td>

    <td class="text-center">

        <button
            class="btn btn-warning btn-sm me-2"
            onclick="editKategori(${item.id_kategori},'${item.nama_kategori}')">

            <i class="bi bi-pencil-square"></i>

        </button>

        <button
            class="btn btn-danger btn-sm"
            onclick="hapusKategori(${item.id_kategori})">

            <i class="bi bi-trash"></i>

        </button>

    </td>

</tr>

`;

        });

    } catch (err) {

        console.log(err);

        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-danger text-center">
                    Gagal mengambil data.
                </td>
            </tr>
        `;

    }

}


// ======================================================
// EDIT
// ======================================================

function editKategori(id, nama) {

    document.getElementById("judulModal").innerHTML = "Edit Kategori";

    document.getElementById("idKategori").value = id;

    document.getElementById("namaKategori").value = nama;

    modalKategori.show();

}


// ======================================================
// SIMPAN
// ======================================================

async function simpanKategori() {

    const id = document.getElementById("idKategori").value;

    const nama = document.getElementById("namaKategori").value.trim();

    if (nama === "") {

        alert("Nama kategori wajib diisi");

        return;

    }

    const form = new URLSearchParams();

    form.append("nama_kategori", nama);

    let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.KATEGORI;

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

        modalKategori.hide();

        loadKategori();

    }

    catch (err) {

        console.log(err);

        alert("Gagal menyimpan data.");

    }

}


// ======================================================
// HAPUS
// ======================================================

async function hapusKategori(id) {

    if (!confirm("Yakin ingin menghapus?")) {

        return;

    }

    try {

        const response = await fetch(

            CONFIG.BASE_URL +
            CONFIG.ENDPOINTS.KATEGORI +
            "/" +
            id,

            {

                method: "DELETE",

                headers: authHeader()

            }

        );

        const result = await response.json();

        alert(result.message);

        loadKategori();

    }

    catch (err) {

        console.log(err);

        alert("Gagal menghapus data.");

    }

}