<?php

namespace Core;

class Router {
    private $routes = [];
    private $method;
    private $path;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->path = str_replace('/api', '', $this->path);
    }

    public function get($path, $callback) {
        $this->routes['GET'][$path] = $callback;
    }

    public function post($path, $callback) {
        $this->routes['POST'][$path] = $callback;
    }

    public function put($path, $callback) {
        $this->routes['PUT'][$path] = $callback;
    }

    public function delete($path, $callback) {
        $this->routes['DELETE'][$path] = $callback;
    }

    public function dispatch() {
        if (!isset($this->routes[$this->method])) {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            return;
        }

        foreach ($this->routes[$this->method] as $pattern => $callback) {
            if ($this->matchRoute($pattern)) {
                call_user_func($callback);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }

    private function matchRoute($pattern) {
        $pattern = str_replace('/', '\\/', $pattern);
        $pattern = preg_replace('/\{([^}]+)\}/', '(?P<$1>[^/]+)', $pattern);
        $pattern = '/^' . $pattern . '$/i';

        return preg_match($pattern, $this->path);
    }
}
