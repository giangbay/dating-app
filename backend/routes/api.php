<?php

use Core\Router;
use App\Controllers\AuthController;

$router = new Router();

// Health check
$router->get('/', function () {
    \Core\Response::json(['status' => 'OK', 'message' => 'Dating App API is running']);
});

// Auth routes
$authController = new AuthController();
$router->post('/auth/register', [$authController, 'register']);
$router->post('/auth/login', [$authController, 'login']);

// Users routes (to be implemented)
// $router->get('/users/{id}', [$userController, 'show']);
// $router->put('/users/{id}', [$userController, 'update']);
// $router->get('/users/search', [$userController, 'search']);

// Matches routes (to be implemented)
// $router->get('/matches', [$matchController, 'index']);
// $router->post('/matches/like', [$matchController, 'like']);
// $router->post('/matches/skip', [$matchController, 'skip']);

return $router;
