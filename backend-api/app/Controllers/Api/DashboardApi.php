<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class DashboardApi extends ResourceController
{
    public function index()
    {
        $db = \Config\Database::connect();

        return $this->respond([
            'status' => true,
            'data' => [
                'buku' => $db->table('buku')->countAllResults(),
                'kategori' => $db->table('kategori')->countAllResults(),
                'penulis' => $db->table('penulis')->countAllResults(),
                'anggota' => $db->table('anggota')->countAllResults(),
            ]
        ]);
    }
}