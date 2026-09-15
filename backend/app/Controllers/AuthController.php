<?php

namespace App\Controllers;

use App\Models\User;
use Core\Request;
use Core\Response;

class AuthController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function register() {
        $request = new Request();
        
        $email = $request->get('email');
        $username = $request->get('username');
        $password = $request->get('password');
        $passwordConfirm = $request->get('password_confirm');

        // Validation
        if (!$email || !$username || !$password) {
            Response::error('All fields are required', 400);
        }

        if ($password !== $passwordConfirm) {
            Response::error('Passwords do not match', 400);
        }

        if ($this->userModel->findByEmail($email)) {
            Response::error('Email already exists', 400);
        }

        if ($this->userModel->findByUsername($username)) {
            Response::error('Username already exists', 400);
        }

        // Create user
        $userId = $this->userModel->create([
            'email' => $email,
            'username' => $username,
            'password' => password_hash($password, PASSWORD_BCRYPT),
            'status' => 'active'
        ]);

        $user = $this->userModel->findById($userId);
        unset($user['password']);

        Response::success($user, 'User registered successfully', 201);
    }

    public function login() {
        $request = new Request();
        
        $email = $request->get('email');
        $password = $request->get('password');

        if (!$email || !$password) {
            Response::error('Email and password are required', 400);
        }

        $user = $this->userModel->findByEmail($email);
        if (!$user || !password_verify($password, $user['password'])) {
            Response::error('Invalid email or password', 401);
        }

        if ($user['status'] !== 'active') {
            Response::error('Account is inactive', 403);
        }

        unset($user['password']);
        $token = $this->generateToken($user);
        $user['token'] = $token;

        Response::success($user, 'Login successful');
    }

    private function generateToken($user) {
        // Simple JWT token generation (use proper library in production)
        $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = base64_encode(json_encode([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'iat' => time(),
            'exp' => time() + (24 * 60 * 60) // 24 hours
        ]));
        
        $signature = hash_hmac('sha256', "$header.$payload", getenv('JWT_SECRET'), true);
        $signature = base64_encode($signature);
        
        return "$header.$payload.$signature";
    }
}
