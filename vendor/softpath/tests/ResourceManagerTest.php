<?php


class ResourceManagerTest extends PHPUnit_Framework_TestCase {


    public function testAskPermission() {

        $resources = [
              "/foo" => [
                   "testrole","editor","admin"
                 ]
        ];
       $pmt = new \Softpath\ResourceManager($resources);
       $user = $this->getMock("\Softpath\User",[],[],'',false);
       $resource = $this->getMock("\Softpath\Resource",[],[],'',false);

       $user->expects($this->any())
           ->method('getRoles')
           ->will($this->returnValue(['testrole']));


       $allowed = $pmt->askPermission("/foo",$user);

       $this->assertTrue($allowed);

    }
}
