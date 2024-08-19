<?php
class DB{
    private $conn;
    public function __construct(){
        $this->conntect();
    }

    private function conntect(){
        $serverName = 'localhost\\SQLEXPRESS';
        $database = 'Learn_swcb_new';
        $uid = 'Learn_swcb';
        $encryptionKey = 'ardswc';
        $encryptedData=getenv('DB_PASSWORD');
        $pwd = $this->decryptData($encryptedData, $encryptionKey);
        $connectionOptions = array(
            "Database" => $database,
            "Uid" => $uid,
            "PWD" => $pwd,
            "CharacterSet" => "UTF-8"
        );

        $conn = sqlsrv_connect($serverName, $connectionOptions);

        $this->conn = $conn;
    }

    public function query($sql, $params = []){
        $res = '';

        if(!empty($sql)){
            // error_log(print_r($sql, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
            $stmt = sqlsrv_query($this->conn, $sql, $params);

            if ($stmt === false) {
                // $res = print_r(sqlsrv_errors(), true);
                // error_log(print_r(sqlsrv_errors(), true) . PHP_EOL, 3, __DIR__ . '/debug.log');
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

    private function decryptData($data, $encryptionKey) {
        $decodedData = base64_decode($data);
        $iv = substr($decodedData, 0, 16);
        $encryptedData = substr($decodedData, 16);
        return openssl_decrypt($encryptedData, 'aes-256-cbc', $encryptionKey, 0, $iv);
    }
}