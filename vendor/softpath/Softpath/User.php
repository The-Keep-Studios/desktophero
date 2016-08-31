<?php

namespace Softpath;

class User {

    protected $pdo;
    protected $user_id;
    protected $roles = [];

    public function __construct($pdo,$user_id) {
            $this->pdo = $pdo;
            $this->user_id = $user_id;
            //need to query database for account associated with user_id
            //account will hold the role
    }

    public function addRole($role) {
        array_push($this->roles,$role);
    }
    public function hasRole($role) {
        return in_array($role,$this->roles);
    }
    public function getRoles() {
           return $this->roles;
    }
}
