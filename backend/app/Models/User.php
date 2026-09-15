<?php

namespace App\Models;

use Core\Database;

class User {
    protected $table = 'users';
    protected $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function create($data) {
        return $this->db->insert($this->table, $data);
    }

    public function findById($id) {
        return $this->db->fetch(
            "SELECT * FROM {$this->table} WHERE id = ?",
            [$id]
        );
    }

    public function findByEmail($email) {
        return $this->db->fetch(
            "SELECT * FROM {$this->table} WHERE email = ?",
            [$email]
        );
    }

    public function findByUsername($username) {
        return $this->db->fetch(
            "SELECT * FROM {$this->table} WHERE username = ?",
            [$username]
        );
    }

    public function update($id, $data) {
        return $this->db->update($this->table, $data, "id = $id");
    }

    public function delete($id) {
        return $this->db->delete($this->table, "id = $id");
    }

    public function getAll($limit = 10, $offset = 0) {
        return $this->db->fetchAll(
            "SELECT * FROM {$this->table} LIMIT ? OFFSET ?",
            [$limit, $offset]
        );
    }
}
