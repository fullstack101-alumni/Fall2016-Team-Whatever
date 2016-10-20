<?php
	require_once ('D:\CLASSES\Fullstack2\db.php');
	require_once 'PHPUnit/Autoload.php';
	ini_set('display_errors', 1); 
	ini_set('error_reporting', E_ALL);
	
	class dbTest extends PHPUnit_Framework_TestCase {
		
		// enter data for the database !!!!
		public $dbname = 'studymanag';
		public $dbuser = 'test';
		public $dbpass = '1234';
		public $dbhost = 'localhost';
		public $test ="";
		
		public $table = 'tasks';
		public $write_data= array (3, 3, 'test1', 'other', NULL, '1', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-12 22:17:45');
		
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
			$this->test = new DB($this->dbname, $this->dbhost, $this->dbuser, $this->dbpass);
		}
		
		public function testSimpleRead() {
			$res = $this->test->simpleRead($this->table);
			$this->assertTrue(!empty($res));
		}
		
		public function testWrite() {
			$res = $this->simpleWrite($this->table, $this->write_data);
			$this->assertTrue(!empty($res));
		}
		
				
		public function testRead() {
			$sql = "SELECT id, fname, lname, username, email FROM users WHERE id = 1 AND fname = fn";
			   
			$res = $this->read($sql);
			$this->assertTrue(!empty($res) || $res == FALSE);
		}	

		public function testModify() {
			$sql = "DELETE FROM tasks WHERE id = 1 AND userid = 3";
			   
			$res = $this->modify($sql);
			$this->assertTrue(!empty($res) || $res == FALSE);
		}

	}
?>