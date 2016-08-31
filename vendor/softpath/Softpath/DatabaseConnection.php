<?php

namespace Softpath;

class DatabaseConnection {

    private $dsn;
    private $username;
    private $password;
    private $options;
    private $error_message;

    public function __construct($settings=array()) {

            $this->dsn = $settings['dsn'];
            $this->username = $settings['username'];
            $this->password = $settings['password'];
            $this->options = isset($settings['options']) ? $settings['options']: array();
    }

    public function getPDO() {
        try {
            $pdo = new \PDO($this->dsn,$this->username,$this->password,$this->options);
        } catch (\PDOException $e) {
            $this->error_message = $e->getMessage();
            echo $this->error_message;
            return false;
      }
            return $pdo;
    }

    public function showErrors() {
        return $this->error_message;
    }

}
