<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table = 'buku';

    protected $primaryKey = 'id_buku';

    protected $returnType = 'array';

    protected $allowedFields = [
        'judul',
        'id_kategori',
        'id_penulis',
        'tahun_terbit',
        'stok'
    ];

    protected $useTimestamps = false;
}