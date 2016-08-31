<?php

namespace Softpath;

class ResourceManager {

    /**
     * @var array
     */
    protected $settings = ["super_user" => "super"];

    /**
     * @var array
     */
    protected $resources = [];


    public function __construct($resources = [],$settings = []) {
        $this->resources = $resources;
        $this->settings = array_merge($this->settings,$settings);
    }

    public function addResource($name,$roles = []) {
            $this->resources[$name] = $roles;
    }

    public function getResourceRoles($name) {
        return isset($this->resources[$name]) ? $this->resources[$name] : false;
    }

    /**
     * Get the route that was passed in, do a lookup for a resource's roles and compare to user's roles
     *
     * if user has any of the roles for the resource
     * return true
     * otherwise respond with false.
     *
     * @param Array $resource_name the key to the assoc array of resources
     * @param Array $user_roles the roles the user has
     *
     * @return boolean
     */
    public function askPermission($resource_name,$user_roles) {
        $roles = $this->getResourceRoles($resource_name);
        if (!$roles) {
            return true;
        }
        //add the super_user role to allow superuser's access to anything
        array_push($roles,$this->settings['super_user']);
        $result = array_intersect($roles,$user_roles);
        if (!empty($result)) {
            return true;
        }
        return false;
    }

}
