<?php

/**
 * Test class for \Softpath\Session object
 *
 **/
/**
 * @var array this is needed to fake out the session SUPERGLOBAL
 */
global $_SESSION;

class SessionTest extends PHPUnit_Framework_TestCase {

    public $mockPDO;
    public $mockPDOStmt;

    public function setUp() {
            $this->mockPDO = $this->getMock('mockPDO', ['prepare'],['mysql:host=localhost;port=3306;dbname=softpath_test','softpath_user','softpath_pass'],'testpdo',true,false); // mock pdo
            $this->mockPDOStmt = $this->getMock('mockPDOStatement', ['execute','fetch'],[],'testpdostatement',true,false);
            $_SESSION = [];
    }

    public function testSessionSettings() {
           $pdo = $this->mockPDO;
           $expire_date = strtotime('24 hours');
           $session = \Softpath\Session::getInstance($pdo, ['expires' => $expire_date,'httponly' => true]);
           $settings = $session->settings;
           $this->assertEquals(
               [ 'expires' => $expire_date, 'path' => '/', 'domain' => null, 'secure' => false, 'httponly' => true, 'name' => 'softpath_session'],
               $settings
                    );

    }

    public function testSessionGet() {
           $pdo = $this->mockPDO;
           $testtoken =  'testtoken';
           $_SESSION['user.token'] = $testtoken;
           $session = \Softpath\Session::getInstance($pdo);
           $this->assertEquals($testtoken, $session->get('user.token'));

    }

    public function testSessionSet() {
           $pdo = $this->mockPDO;
           $testtoken =  'testaddress';
           $session = \Softpath\Session::getInstance($pdo);
           $session->set('user.address', $testtoken);
           $this->assertEquals($testtoken, $_SESSION['user.address']);

    }

    public function testSessionLoad() {
        $session_data = [
            'token' => 'testtoken',
            'user.id' => '123123123',
            'loggedin' => true
            ];
           $session_result = [
               'session_data' => serialize($session_data),
               ];
           $pdo = $this->mockPDO;
           $pdoStmt = $this->mockPDOStmt;

           $pdoStmt->expects($this->once())
                   ->method('execute')
                   ->will($this->returnValue(
                       $this->equalTo(['testtoken'])
                   ));
           $pdoStmt->expects($this->once())
                   ->method('fetch')
                   ->will($this->returnValue($session_result));
           $pdo->expects($this->any())
               ->method('prepare')
               ->with($this->equalTo('SELECT session_data,expires FROM sessions WHERE token = ?'))
               ->will($this->returnValue($pdoStmt));

           $session = \Softpath\Session::getInstance($pdo);
           $result = $session->loadSession('testtoken');
           $this->assertEquals($session->get('token'),$_SESSION['token']);

    }

    public function testSessionSave() {
           $session_id = 'testsavetoken';
           $user_id = 7;
           $_SESSION['token'] = $session_id;
           $_SESSION['user.id'] = $user_id;
           $session_data = serialize($_SESSION);
           $expires = strtotime('24 hours');
           $pdo = $this->mockPDO;
           $pdoStmt = $this->mockPDOStmt;
           $pdoStmt->expects($this->once())
                   ->method('execute')
                   ->with(
                       $this->equalTo([$user_id,$session_id,$expires,$session_data])
                   );
           $pdo->expects($this->any())
               ->method('prepare')
               ->with($this->equalTo("INSERT INTO sessions (user_id,token,expires,session_data) VALUES (?,?,FROM_UNIXTIME(?),?);"))
               ->will($this->returnValue($pdoStmt));

           $mockApp = new mockApp();
           $session = \Softpath\Session::getInstance($pdo,['expires'=>$expires]);
           $session->setApplication($mockApp);
           $session->saveSession();

    }

}
class mockPDO extends \PDO {
    public function __construct() {
    }
}
class mockApp {
       public function setCookie($cookie,$value){

       }
}
