<?php

namespace Core;

class Request {
    private $data;
    private $headers;

    public function __construct() {
        $this->data = $this->parseInput();
        $this->headers = getallheaders();
    }

    private function parseInput() {
        $input = file_get_contents('php://input');
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        if (strpos($contentType, 'application/json') !== false) {
            return json_decode($input, true) ?? [];
        }

        if (strpos($contentType, 'application/x-www-form-urlencoded') !== false) {
            parse_str($input, $data);
            return $data;
        }

        return array_merge($_GET, $_POST);
    }

    public function get($key, $default = null) {
        return $this->data[$key] ?? $default;
    }

    public function all() {
        return $this->data;
    }

    public function has($key) {
        return isset($this->data[$key]);
    }

    public function header($key, $default = null) {
        return $this->headers[$key] ?? $default;
    }

    public function getAuthToken() {
        $header = $this->header('Authorization');
        if (preg_match('/Bearer\s+(\S+)/', $header, $matches)) {
            return $matches[1];
        }
        return null;
    }
}
