<?php

namespace App\Controllers\Api;

use App\Models\AnggotaModel;
use CodeIgniter\RESTful\ResourceController;

class AnggotaApi extends ResourceController
{
    protected $modelName = AnggotaModel::class;
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
        $anggota = $this->model->find($id);

        if (!$anggota) {
            return $this->failNotFound('Data anggota tidak ditemukan.');
        }

        return $this->respond([
            'status' => true,
            'data' => $anggota
        ]);
    }

    public function create()
    {
        $nama  = trim($this->request->getPost('nama_anggota'));
        $email = trim($this->request->getPost('email'));
        $hp    = trim($this->request->getPost('no_hp'));

        if ($nama == '' || $email == '' || $hp == '') {
            return $this->failValidationErrors('Semua field wajib diisi.');
        }

        $this->model->insert([
            'nama_anggota' => $nama,
            'email'        => $email,
            'no_hp'        => $hp
        ]);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Anggota berhasil ditambahkan.'
        ]);
    }

    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data anggota tidak ditemukan.');
        }

        $data = $this->request->getRawInput();

        $this->model->update($id, [
            'nama_anggota' => trim($data['nama_anggota']),
            'email'        => trim($data['email']),
            'no_hp'        => trim($data['no_hp'])
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Anggota berhasil diperbarui.'
        ]);
    }

    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data anggota tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Anggota berhasil dihapus.'
        ]);
    }
}