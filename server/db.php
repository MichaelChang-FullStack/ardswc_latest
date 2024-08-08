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

        if(!empty($sql)){
            // error_log(print_r($sql, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
            $stmt = sqlsrv_query($this->conn, $sql, $params);

            if ($stmt === false) {
                // $res = print_r(sqlsrv_errors(), true);
                error_log(print_r(sqlsrv_errors(), true) . PHP_EOL, 3, __DIR__ . '/debug.log');
                $res = 'db error!';
            }else{
                $json_array = array();
                while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                    $json_array[] = $data;
                }
                $res = $json_array;
            }
            // sqlsrv_free_stmt($stmt);
            // sqlsrv_close($conn);
        }
        return $res;
    }
}