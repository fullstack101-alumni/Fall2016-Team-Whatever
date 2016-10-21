<?php
	require_once 'PHPUnit/Autoload.php';
		require_once ('D:\CLASSES\Fullstack2\service.php');
	
	require_once('D:\CLASSES\Fullstack2\vendor\phpunit\simpletest\autorun.php');
	require_once('D:\CLASSES\Fullstack2\vendor\phpunit\simpletest\web_tester.php');
	
	ini_set('display_errors', 1); 
	ini_set('error_reporting', E_ALL);
	
class SimpleFormTests extends WebTestCase {

  function setUp() {
    $this->get('D:\CLASSES\Fullstack2\my-proj\app\components\users\signinView.html');
  
	$this->setField("username", "test");
	$this->setField("password", "1234");
	
	}
	
	public function testBuildArray() {
			
        $res = login(buildArray($this->fields));
			
			$this->assertTrue($res== '{"error":"required http argument(s) not provided"}');
		}
}

?>