<?php

namespace App\Controllers\Api;

use App\Models\PenulisModel;
use CodeIgniter\RESTful\ResourceController;

class PenulisApi extends ResourceController
{
    protected $modelName = PenulisModel::class;
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
        $penulis = $this->model->find($id);

        if (!$penulis) {
            return $this->failNotFound('Data penulis tidak ditemukan.');
        }

        return $this->respond([
            'status' => true,
            'data' => $penulis
        ]);
    }

    public function create()
    {
        $nama = trim($this->request->getPost('nama_penulis'));

        if (empty($nama)) {
            return $this->failValidationErrors('Nama penulis wajib diisi.');
        }

        $this->model->insert([
            'nama_penulis' => $nama
        ]);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Penulis berhasil ditambahkan.'
        ]);
    }

    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data penulis tidak ditemukan.');
        }

        $data = $this->request->getRawInput();

        if (empty($data['nama_penulis'])) {
            return $this->failValidationErrors('Nama penulis wajib diisi.');
        }

        $this->model->update($id, [
            'nama_penulis' => trim($data['nama_penulis'])
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Penulis berhasil diperbarui.'
        ]);
    }

    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data penulis tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Penulis berhasil dihapus.'
        ]);
    }
}