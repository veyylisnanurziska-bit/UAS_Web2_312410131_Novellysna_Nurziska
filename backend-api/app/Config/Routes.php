<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Default Route
$routes->get('/', 'Home::index');

// ======================
// AUTH
// ======================

$routes->post('login', 'Api\AuthApi::login');

// ======================
// PROTECTED ROUTES
// ======================

$routes->group('', ['filter' => 'auth'], function ($routes) {

    // Test Authentication
    $routes->get('test-auth', function () {
        return service('response')->setJSON([
            'status'  => true,
            'message' => 'Login Berhasil'
        ]);
    });

    // Resource API
    $routes->resource('kategori', [
        'controller' => 'Api\KategoriApi',
        'filter' => 'auth'
    ]);

    $routes->resource('penulis', [
        'controller' => 'Api\PenulisApi',
        'filter' => 'auth'
    ]);

    $routes->resource('anggota', [
        'controller' => 'Api\AnggotaApi',
        'filter' => 'auth'
    ]);

    $routes->resource('buku', [
    'controller' => 'Api\BukuApi',
    'filter' => 'auth'
    ]);
});

$routes->get('dashboard', 'Api\DashboardApi::index', ['filter' => 'auth']);