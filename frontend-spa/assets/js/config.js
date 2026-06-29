const CONFIG = {
    BASE_URL: "http://localhost:8080/",
    ENDPOINTS: {
        LOGIN: "login",
        KATEGORI: "kategori",
        PENULIS: "penulis",
        ANGGOTA: "anggota",
        BUKU: "buku"
    }
};

function authHeader() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}