# UAS_Web2_312410131_Novellysna_Nurziska
Veyy Inventory Management System
Aplikasi web inventaris barang berbasis Single Page Application (SPA) yang dibangun untuk memenuhi tugas UAS Web Programming 2. Aplikasi ini menggunakan CodeIgniter 4 sebagai backend API dan Tailwind CSS untuk antarmuka yang modern dan responsif.

🚀 Fitur Utama
Dashboard Overview: Menampilkan ringkasan data inventaris secara visual.

Manajemen Data Barang (CRUD):

Create: Menambah data barang baru dengan validasi input.

Read: Menampilkan daftar barang secara real-time tanpa refresh halaman.

Update: Mengubah detail data barang (SKU, Nama, Stok, Harga).

Delete: Menghapus data barang dengan konfirmasi user.

User Experience: Transisi antarmuka yang mulus menggunakan Fetch API (AJAX).

🛠️ Tech Stack
Framework Backend: CodeIgniter 4

Frontend: HTML5, JavaScript (Fetch API), Tailwind CSS

Database: MySQL

Icons: FontAwesome

⚙️ Cara Menjalankan
Setup Backend:

Pastikan kamu sudah menginstal XAMPP dan menjalankan Apache & MySQL.

Pindahkan folder project ke dalam direktori htdocs.

Konfigurasi database di file .env (pastikan database.default sudah sesuai).

Buka terminal di folder backend-api dan jalankan: php spark serve.

Setup Frontend:

Buka file index.html yang berada di folder frontend-spa menggunakan browser (atau melalui server lokal).

Pastikan konstanta API di dalam index.html mengarah ke URL backend (default: http://localhost:8080/barang).

👤 Identitas Mahasiswa
Nama: Novellysna Nurziska

NIM: 312410131

Mata Kuliah: Web Programming 2 (UAS)

Catatan Teknis untuk UAS:
Aplikasi ini menerapkan konsep Decoupled Architecture, di mana sisi klien dan server berkomunikasi melalui protokol HTTP. Penggunaan Fetch API memungkinkan aplikasi untuk berinteraksi dengan database tanpa melakukan pemuatan ulang halaman (reload), sehingga performa aplikasi menjadi lebih efisien.
