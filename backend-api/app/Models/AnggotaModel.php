<?php

namespace App\Models;

use CodeIgniter\Model;

class AnggotaModel extends Model
{
    protected $table = 'anggota';

    protected $primaryKey = 'id_anggota';

    protected $returnType = 'array';

    protected $useAutoIncrement = true;

    protected $allowedFields = [
        'nama_anggota',
        'email',
        'no_hp'
    ];

    protected $useSoftDeletes = false;

    protected $useTimestamps = false;
}