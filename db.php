<?php

/*
 * DB Helper class. Uses PDO internally. Abstract, ie no relation to the app data. Maybe I should move more code into model layer...
 */

class DB{
    private $pdo;
    public $error;

    function __construct($db, $host, $usr, $pass){
        try {
            $this->pdo = new PDO("mysql:dbname=$db;host=$host", $usr, $pass);
            $this->error = false;
        }
        catch(PDOException $e){
            $this->error = true;
        }
    }

    //Update/Delete/Insert, return rows affected or FALSE incase of Db problem
    function modify($sql, $data = NULL){
        $stmt = $this->makeS($sql);
        if($stmt->execute($data) === FALSE)
            return FALSE;
        return $stmt->rowCount();
    }

    //Read data, return as assoc array, or FALSE
    function read($sql, $data = NULL){
        $stmt = $this->makeS($sql);
        if($stmt->execute($data) === FALSE)
            return FALSE;
        $data = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    //Build placeholder string ie (?, ?, ?), (?, ?, ?) for prepared statements.
    function buildDataPH(&$data, $perRow = NULL){

        $datalen = count($data);
        $newData = array();

        if($perRow == NULL)
            $perRow = $datalen;

        $sql = "";
        $rows = $datalen/$perRow;

        for($i = 0; $i < $rows; $i++){
            $sql .= "(";
            for($j = 0; $j < $perRow; $j++){
                $currData = $data[$i*$perRow + $j];
                if($currData == '__DEFAULT') {
                    $sql .= 'DEFAULT, ';
                }
                else{
                    $sql .= '?, ';
                    $newData[] = $currData;
                }
            }
            $sql = substr($sql, 0, -2);
            $sql .= "), ";
        }

        return array(substr($sql, 0, -2), $newData);
    }

    //Get data by field and/or value. Do not put external data in the add section, since they are not escaped!
    function simpleRead($table, $val = NULL, $field = 'id', $returnfields = '*', $add = ''){
        $sql = "SELECT $returnfields FROM $table WHERE 1 ";
        $data = NULL;

        if($val !== NULL){
            $sql .= "AND $field = ? ";
            $data[] = $val;
        }

        $sql .= $add;

        return $this->read($sql, $data);
    }

    function simpleWrite($table, $data, $columns = NULL){
        $sql = "INSERT INTO $table VALUES ";

        $dt = $this->buildDataPH($data, $columns);
        $sql .= $dt[0];

        return $this->modify($sql, $dt[1]);
    }

    function lastInsertedId(){
        return $this->pdo->lastInsertId();
    }

    function closeConnection(){
        $this->pdo = NULL;
    }

    private function makeS($sql){
        return $this->pdo->prepare($sql);
    }
}
?>