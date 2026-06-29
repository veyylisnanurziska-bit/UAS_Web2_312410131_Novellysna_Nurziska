// ======================================================
// PENULIS.JS
// ======================================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const modalPenulis = new bootstrap.Modal(
    document.getElementById("modalPenulis")
);

const tbody = document.getElementById("dataPenulis");

document.getElementById("btnTambah").addEventListener("click", () => {

    document.getElementById("judulModal").innerHTML = "Tambah Penulis";

    document.getElementById("idPenulis").value = "";

    document.getElementById("namaPenulis").value = "";

    modalPenulis.show();

});

document.getElementById("btnSimpan").addEventListener("click", simpanPenulis);

document.getElementById("logoutBtn").addEventListener("click", logout);

loadPenulis();


// ======================================================
// LOAD DATA
// ======================================================

async function loadPenulis() {

    tbody.innerHTML = `
        <tr>
            <td colspan="3" class="text-center">
                Loading...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(
            CONFIG.BASE_URL + CONFIG.ENDPOINTS.PENULIS,
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
            👤 ${item.nama_penulis}
        </span>

    </td>

    <td class="text-center">

        <button
            class="btn btn-warning btn-sm me-2"
            onclick="editPenulis(${item.id_penulis}, '${item.nama_penulis}')">

            <i class="bi bi-pencil-square"></i>

        </button>

        <button
            class="btn btn-danger btn-sm"
            onclick="hapusPenulis(${item.id_penulis})">

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

function editPenulis(id, nama) {

    document.getElementById("judulModal").innerHTML = "Edit Penulis";

    document.getElementById("idPenulis").value = id;

    document.getElementById("namaPenulis").value = nama;

    modalPenulis.show();

}


// ======================================================
// SIMPAN
// ======================================================

async function simpanPenulis() {

    const id = document.getElementById("idPenulis").value;

    const nama = document.getElementById("namaPenulis").value.trim();

    if (nama === "") {

        alert("Nama penulis wajib diisi");

        return;

    }

    const form = new URLSearchParams();

    form.append("nama_penulis", nama);

    let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.PENULIS;

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

        modalPenulis.hide();

        loadPenulis();

    } catch (err) {

        console.log(err);

        alert("Gagal menyimpan data.");

    }

}


// ======================================================
// HAPUS
// ======================================================

async function hapusPenulis(id) {

    if (!confirm("Yakin ingin menghapus data?")) {

        return;

    }

    try {

        const response = await fetch(

            CONFIG.BASE_URL +
            CONFIG.ENDPOINTS.PENULIS +
            "/" +
            id,

            {

                method: "DELETE",

                headers: authHeader()

            }

        );

        const result = await response.json();

        alert(result.message);

        loadPenulis();

    } catch (err) {

        console.log(err);

        alert("Gagal menghapus data.");

    }

}