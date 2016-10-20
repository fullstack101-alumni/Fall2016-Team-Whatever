<?php
	require_once ('D:\CLASSES\Fullstack2\service.php');
	require_once 'PHPUnit/Autoload.php';
	ini_set('display_errors', 1); 
	ini_set('error_reporting', E_ALL);
	
	class serviceTest extends PHPUnit_Framework_TestCase {
		
		// enter data for the database !!!!
		public $dbname = 'studymanag';
		public $dbuser = 'test';
		public $dbpass = '1234';
		public $dbhost = 'localhost';
		public $test ="";
		
		public $fields = array('username', 'password');
		
		public $table = 'tasks';
		
	public function __call($command, $arguments) {
        $class_methods = get_class_methods(__CLASS__);
        if(!in_array($command, $class_methods)) {
            throw new BadMethodCallException(
                  "Method $command not defined."
                );
        }
    }
	
	public function setUp() {
			parent::setUp();
		}
		
		public function testBuildArray() {
			
        $res = login(buildArray($this->fields));
			
			$this->assertTrue($res== '{"error":"required http argument(s) not provided"}');
		}
		
		
	}
?>