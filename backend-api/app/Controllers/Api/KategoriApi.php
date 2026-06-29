<?php

namespace App\Controllers\Api;

use App\Models\KategoriModel;
use CodeIgniter\RESTful\ResourceController;

class KategoriApi extends ResourceController
{
    protected $modelName = KategoriModel::class;
    protected $format = 'json';

    public function index()
    {
        return $this->respond([
            'status' => true,
            'data' => $this->model->findAll()
        ]);
    }

    public function show($id = null)
    {
        $kategori = $this->model->find($id);

        if (!$kategori) {
            return $this->failNotFound('Data kategori tidak ditemukan.');
        }

        return $this->respond([
            'status' => true,
            'data' => $kategori
        ]);
    }

    public function create()
    {
        $nama = trim($this->request->getPost('nama_kategori'));

        if (empty($nama)) {
            return $this->failValidationErrors('Nama kategori wajib diisi.');
        }

        $this->model->insert([
            'nama_kategori' => $nama
        ]);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Kategori berhasil ditambahkan.'
        ]);
    }

    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data kategori tidak ditemukan.');
        }

        $data = $this->request->getRawInput();

        if (empty($data['nama_kategori'])) {
            return $this->failValidationErrors('Nama kategori wajib diisi.');
        }

        $this->model->update($id, [
            'nama_kategori' => trim($data['nama_kategori'])
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Kategori berhasil diperbarui.'
        ]);
    }

    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data kategori tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Kategori berhasil dihapus.'
        ]);
    }
}