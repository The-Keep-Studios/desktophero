<?php


class DatabaseTest extends PHPUnit_Framework_TestCase{

    public function testBadConnection() {
        $db = new \Softpath\DatabaseConnection(array(
            "dsn" => "mysql:host=localhost;port=3306;dbname=test",
            "username" => "test_user",
            "password" => "test_pass"
        ));
        $pdo = $db->getPDO();
        $this->assertFalse($pdo,'pdo failed to load.');
        $this->assertEquals("SQLSTATE[28000] [1045] Access denied for user 'test_user'@'localhost' (using password: YES)",$db->showErrors());
    }

    /**
     * NOTE: This test will fail unless you create a database and user
     * dbname   = softpath_test
     * username = softpath_user
     * password = softpath_pass.
     */
    public function testSuccessfulConnection() {
        $db = new \Softpath\DatabaseConnection(array(
            "dsn" => "mysql:host=localhost;port=3306;dbname=softpath_test",
            "username" => "softpath_user",
            "password" => "softpath_pass"
        ));
        $pdo = $db->getPDO();
        $stmt = $pdo->prepare("SHOW DATABASES");
        $stmt->execute();

        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $this->assertEquals(array(array('Database'=>'information_schema'),array('Database'=>'softpath_test'),array('Database'=>'test')),$result);

    }
}
