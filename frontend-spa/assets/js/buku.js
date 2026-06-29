const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const modalBuku = new bootstrap.Modal(document.getElementById("modalBuku"));
const tbody = document.getElementById("dataBuku");

document.getElementById("btnTambah").addEventListener("click", async () => {

    document.getElementById("judulModal").innerText = "Tambah Buku";

    document.getElementById("idBuku").value = "";
    document.getElementById("judulBuku").value = "";
    document.getElementById("tahun").value = "";
    document.getElementById("stok").value = "";

    await loadKategori();
    await loadPenulis();

    modalBuku.show();
});

document.getElementById("btnSimpan").addEventListener("click", simpanBuku);

document.getElementById("logoutBtn").addEventListener("click", logout);

loadData();


// =========================
// LOAD DATA
// =========================
async function loadData() {

    tbody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">Loading...</td>
        </tr>
    `;

    try {

        const res = await fetch(CONFIG.BASE_URL + CONFIG.ENDPOINTS.BUKU, {
            headers: authHeader()
        });

        const result = await res.json();

        tbody.innerHTML = "";

        if (!result.data || result.data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">Tidak ada data</td>
                </tr>
            `;
            return;
        }

        let no = 1;

        result.data.forEach(item => {

            tbody.innerHTML += `
                <tr>
                    <td>${no++}</td>
                    <td>${item.judul}</td>
                    <td>${item.nama_kategori}</td>
                    <td>${item.nama_penulis}</td>
                    <td>${item.tahun_terbit}</td>
                    <td>${item.stok}</td>
                    <td>
                        <button class="btn btn-warning btn-sm"
                            onclick="editBuku(${item.id_buku})">
                            Edit
                        </button>

                        <button class="btn btn-danger btn-sm"
                            onclick="hapusBuku(${item.id_buku})">
                            Hapus
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.log(err);
        tbody.innerHTML = `<tr><td colspan="6" class="text-danger text-center">Error load data</td></tr>`;
    }
}


// =========================
// LOAD KATEGORI
// =========================
async function loadKategori() {

    const res = await fetch(CONFIG.BASE_URL + CONFIG.ENDPOINTS.KATEGORI, {
        headers: authHeader()
    });

    const result = await res.json();

    const select = document.getElementById("kategori");

    select.innerHTML = "";

    result.data.forEach(item => {
        select.innerHTML += `
            <option value="${item.id_kategori}">
                ${item.nama_kategori}
            </option>
        `;
    });
}


// =========================
// LOAD PENULIS
// =========================
async function loadPenulis() {

    const res = await fetch(CONFIG.BASE_URL + CONFIG.ENDPOINTS.PENULIS, {
        headers: authHeader()
    });

    const result = await res.json();

    const select = document.getElementById("penulis");

    select.innerHTML = "";

    result.data.forEach(item => {
        select.innerHTML += `
            <option value="${item.id_penulis}">
                ${item.nama_penulis}
            </option>
        `;
    });
}


// =========================
// EDIT
// =========================
async function editBuku(id) {

    const res = await fetch(CONFIG.BASE_URL + CONFIG.ENDPOINTS.BUKU, {
        headers: authHeader()
    });

    const result = await res.json();

    const buku = result.data.find(b => b.id_buku == id);

    if (!buku) {
        alert("Data tidak ditemukan");
        return;
    }

    await loadKategori();
    await loadPenulis();

    document.getElementById("judulModal").innerText = "Edit Buku";

    document.getElementById("idBuku").value = buku.id_buku;
    document.getElementById("judulBuku").value = buku.judul;
    document.getElementById("kategori").value = buku.id_kategori;
    document.getElementById("penulis").value = buku.id_penulis;
    document.getElementById("tahun").value = buku.tahun_terbit;
    document.getElementById("stok").value = buku.stok;

    modalBuku.show();
}


// =========================
// SIMPAN
// =========================
async function simpanBuku() {

    const id = document.getElementById("idBuku").value;

    const form = new URLSearchParams();
    form.append("judul", document.getElementById("judulBuku").value);
    form.append("id_kategori", document.getElementById("kategori").value);
    form.append("id_penulis", document.getElementById("penulis").value);
    form.append("tahun_terbit", document.getElementById("tahun").value);
    form.append("stok", document.getElementById("stok").value);

    let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.BUKU;
    let method = "POST";

    if (id) {
        url += "/" + id;
        method = "PUT";
    }

    try {

        const res = await fetch(url, {
            method: method,
            headers: {
                ...authHeader(),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: form
        });

        const result = await res.json();

        alert(result.message);

        modalBuku.hide();
        loadData();

    } catch (err) {
        console.log(err);
        alert("Gagal simpan data");
    }
}


// =========================
// HAPUS
// =========================
async function hapusBuku(id) {

    if (!confirm("Yakin hapus data?")) return;

    try {

        const res = await fetch(
            CONFIG.BASE_URL + CONFIG.ENDPOINTS.BUKU + "/" + id,
            {
                method: "DELETE",
                headers: authHeader()
            }
        );

        const result = await res.json();

        alert(result.message);
        loadData();

    } catch (err) {
        console.log(err);
        alert("Gagal hapus data");
    }
}