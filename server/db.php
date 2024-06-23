<?php
class DB{
    private $conn;
    public function __construct(){
        $this->conntect();
    }

    private function conntect(){
        include("config.php");

        $this->conn = $conn;
    }

    public function query($sql, $params = []){
        $res = '';

        $stmt = sqlsrv_query($this->conn, $sql, $params);

        if ($stmt === false) {
            $res = print_r(sqlsrv_errors(), true);
        }else{
            $json_array = array();
            while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $json_array[] = $data;
            }
        }
        // sqlsrv_free_stmt($stmt);
        // sqlsrv_close($conn);

        return $res;
    }
}