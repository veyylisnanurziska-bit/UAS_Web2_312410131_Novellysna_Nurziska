<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;

class AuthApi extends BaseController
{
    public function login()
    {
        try {

            $userModel = new UserModel();

            $username = trim($this->request->getPost('username'));
            $password = trim($this->request->getPost('password'));

            if ($username === '' || $password === '') {
                return $this->response->setStatusCode(400)->setJSON([
                    'status' => false,
                    'message' => 'Username dan password wajib diisi'
                ]);
            }

            $user = $userModel
                ->where('username', $username)
                ->where('password', md5($password))
                ->first();

            if (!$user) {
                return $this->response->setStatusCode(401)->setJSON([
                    'status' => false,
                    'message' => 'Username atau password salah'
                ]);
            }

            $token = bin2hex(random_bytes(32));

            $userModel->update($user['id'], [
                'token' => $token
            ]);

            return $this->response->setJSON([
                'status' => true,
                'message' => 'Login berhasil',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username']
                ]
            ]);

        } catch (\Throwable $e) {

            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}