<?php

namespace App\Controllers\Api;

use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class BukuApi extends ResourceController
{
    protected $modelName = BukuModel::class;
    protected $format    = 'json';

    // ===============================
    // TAMPIL SEMUA DATA
    // ===============================
    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('buku')
            ->select('
                buku.*,
                kategori.nama_kategori,
                penulis.nama_penulis
            ')
            ->join('kategori', 'kategori.id_kategori = buku.id_kategori')
            ->join('penulis', 'penulis.id_penulis = buku.id_penulis')
            ->orderBy('id_buku', 'DESC')
            ->get()
            ->getResultArray();

        return $this->respond([
            'status' => true,
            'data'   => $data
        ]);
    }

    // ===============================
    // DETAIL DATA
    // ===============================
    public function show($id = null)
    {
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }

        return $this->respond([
            'status' => true,
            'data'   => $data
        ]);
    }

    // ===============================
    // TAMBAH DATA
    // ===============================
    public function create()
    {
        $judul = trim($this->request->getPost('judul'));

        if ($judul == '') {
            return $this->respond([
                'status' => false,
                'message' => 'Judul buku wajib diisi.'
            ]);
        }

        $this->model->insert([
            'judul'         => $judul,
            'id_kategori'   => $this->request->getPost('id_kategori'),
            'id_penulis'    => $this->request->getPost('id_penulis'),
            'tahun_terbit'  => $this->request->getPost('tahun_terbit'),
            'stok'          => $this->request->getPost('stok')
        ]);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Data buku berhasil ditambahkan.'
        ]);
    }

    // ===============================
    // EDIT DATA
    // ===============================
    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }

        $data = $this->request->getRawInput();

        $this->model->update($id, [
            'judul'         => trim($data['judul']),
            'id_kategori'   => $data['id_kategori'],
            'id_penulis'    => $data['id_penulis'],
            'tahun_terbit'  => $data['tahun_terbit'],
            'stok'          => $data['stok']
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Data buku berhasil diupdate.'
        ]);
    }

    // ===============================
    // HAPUS DATA
    // ===============================
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Data buku berhasil dihapus.'
        ]);
    }
}