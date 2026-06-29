# 📚 E-Library

E-Library adalah aplikasi perpustakaan berbasis **Web** yang dibangun menggunakan **CodeIgniter 4** sebagai Backend REST API dan **HTML, CSS, JavaScript (Vanilla JS)** sebagai Frontend.

Aplikasi ini menerapkan konsep **Single Page Application (SPA)** dengan komunikasi menggunakan REST API dan autentikasi berbasis Token.

---

# 🚀 Fitur

* Login Admin
* Dashboard
* Manajemen Kategori
* Manajemen Buku
* Manajemen Penulis
* Manajemen Anggota
* CRUD Data (Create, Read, Update, Delete)
* REST API
* Responsive Design
* Modern Dashboard UI

---

# 🛠 Teknologi

### Backend

* PHP 8
* CodeIgniter 4
* MySQL
* REST API

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* Bootstrap Icons
* JavaScript (ES6)

### Database

* MySQL
* phpMyAdmin

---

# 📂 Struktur Project

```
elibrary/

│
├── backend/
│   ├── app/
│   ├── public/
│   └── .env
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   │
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── kategori.html
│   │   ├── buku.html
│   │   ├── penulis.html
│   │   └── anggota.html
│   │
│   └── login.html
│
└── database/
    └── db_elibrary.sql
```

---

# ⚙ Cara Menjalankan

## 1. Clone Repository

```
git clone https://github.com/username/elibrary.git
```

---

## 2. Import Database

Buka phpMyAdmin

Buat database

```
db_elibrary
```

Import file

```
db_elibrary.sql
```

---

## 3. Konfigurasi Backend

Edit file

```
backend/.env
```

Ubah konfigurasi database

```
database.default.hostname = localhost
database.default.database = db_elibrary
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port = 3306
```

---

## 4. Jalankan Backend

Masuk ke folder backend

```
cd backend
```

Kemudian jalankan

```
php spark serve
```

Server berjalan di

```
http://localhost:8080
```

---

## 5. Jalankan Frontend

Buka folder frontend menggunakan Live Server atau web server.

Contoh:

```
http://localhost/frontend/login.html
```

---

# 🔐 Login

Masukkan akun admin yang terdapat pada database.

Contoh:

Username

```
admin
```

Password

```
admin
```

(Sesuaikan dengan data pada tabel admin.)

---

# 📸 Tampilan

* Login
<img width="1362" height="717" alt="login" src="https://github.com/user-attachments/assets/e69fb001-b33a-40cf-982e-e71392e57706" />

* Dashboard
<img width="1362" height="720" alt="image" src="https://github.com/user-attachments/assets/5c2a5da1-c939-4059-b8fb-07e59f60a675" />

* Data Kategori
<img width="1362" height="717" alt="image" src="https://github.com/user-attachments/assets/80bf8f92-700e-473a-818d-8aac94fe3a58" />

* Data Buku
<img width="1362" height="717" alt="buku" src="https://github.com/user-attachments/assets/a8126fd9-be50-4d54-aec0-a597fb86bd27" />
* Data Penulis
<img width="1362" height="720" alt="penulis" src="https://github.com/user-attachments/assets/25effed8-4a94-4fac-89e6-91f91375c1bc" />
* Data Anggota
<img width="1362" height="717" alt="anggota" src="https://github.com/user-attachments/assets/ad233fb7-9269-4da2-9f90-2052f973b3d6" />
---

# 👨‍💻 Author

Nama : (Nama Kamu)

Program Studi : Teknik Informatika

Universitas : (Nama Universitas)

Tahun : 2025
