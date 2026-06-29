<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $default = [

    'allowedOrigins' => [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
    ],

    'allowedOriginsPatterns' => [],

    'supportsCredentials' => false,

    'allowedHeaders' => [
        '*'
    ],

    'exposedHeaders' => [
        '*'
    ],

    'allowedMethods' => [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS',
        'PATCH'
    ],

    'maxAge' => 7200,
];
}