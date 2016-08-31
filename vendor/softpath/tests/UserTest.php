<?php

class UserTest extends PHPUnit_Framework_TestCase {

    protected $mockPdo;

    public function setUp() {
            $this->mockPdo = $this->getMock('mockPDO', ['prepare'],['mysql:host=localhost;port=3306;dbname=softpath_test','softpath_user','softpath_pass'],'testpdo',true,false); // mock pdo
    }
    public function tearDown() {
        $this->mockPdo = null;
    }
    public function testHasRole() {
        $pdo = $this->mockPdo;
        $user_id = 1;
        $user = new \Softpath\User($pdo,$user_id);
        $user->addRole("testrole");
        $result = $user->hasRole("testrole");

        $this->assertTrue($result,"The user does not have the role.");
    }
    public function testGetRoles() {
        $pdo = $this->mockPdo;
        $user_id = 1;
        $user = new \Softpath\User($pdo,$user_id);
        $user->addRole("testrole");
        $user->addRole("testrole2");
        $roles = $user->getRoles();
        $expected = ["testrole","testrole2"];

        $this->assertEquals($expected,$roles,"The user has all the roles.");
    }

}
class mockPDO extends \PDO {
    public function __construct() {
    }
}
