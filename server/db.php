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

    public function get_conn(){
        return $this->conn;
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

    public function select($attr){
        $table = $attr['table'] ?? '';
        $columns = $attr['columns'] ?? '*';
        $where = $attr['where'] ?? [];
        $order = $attr['order'] ?? '';

        $result = '';

        if(!empty($table)){
            if(is_array($columns)){
                $columns = implode($columns);
            }
            $sql = "SELECT $columns
            FROM $table";

            $params = [];
            if(!empty($where)){
                $placeholders = array_map(function($column){
                    return "$column = ?";
                }, array_keys($where));
                $placeholders = implode(' AND ', $placeholders);
                
                $params = array_values($where);

                $sql .= ' WHERE ' . $placeholders;
            }

            if(!empty($order)){
                $sql .= ' ORDER BY ' . $order;
            }

            $result = $this->query($sql, $params);
        }

        return $result;
    }

    public function insert($table, $pairs){
        $row_id = null;
        if(!empty($pairs)){
            $columns = implode(',', array_keys($pairs));
            $placeholders = implode(',', array_pad([], count($pairs), '?'));
            $params = array_values($pairs);

            $sql = "INSERT INTO $table ($columns)
            VALUES($placeholders); SELECT SCOPE_IDENTITY()";

            $stmt = sqlsrv_query($this->conn, $sql, $params);

            sqlsrv_next_result($stmt); 
            sqlsrv_fetch($stmt); 
            $row_id = sqlsrv_get_field($stmt, 0); 
        }

        return $row_id;
    }

    public function update($table, $pairs, $where){
        if(!empty($pairs) && !empty($where)){
            $placeholders = array_map(function($column){
                return "$column = ?";
            }, array_keys($pairs));
            $placeholders = implode(',', $placeholders);
            $params = array_values($pairs);

            $where_placeholders = array_map(function($column){
                return "$column = ?";
            }, array_keys($where));
            $where_placeholders = implode(' AND ', $where_placeholders);
            
            $params = array_merge($params, array_values($where));
            $params = array_values($params);

            $sql = "UPDATE $table
            SET $placeholders
            WHERE $where_placeholders";

            sqlsrv_query($this->conn, $sql, $params);
        }
    }

    public function delete($table, $where, $force = false){
        $where_placeholders = array_map(function($column){
            return "$column = ?";
        }, array_keys($where));
        $where_placeholders = implode(' AND ', $where_placeholders);
        
        $params = $where;
        if(!$force){
            $params = array_filter($where);
        }
        $params = array_values($params);

        if(!empty($table) && !empty($where)){
            $sql = "DELETE FROM $table
            WHERE $where_placeholders";

            sqlsrv_query($this->conn, $sql, $params);
        }
    }

    public function update_meta($table, $meta_key, $meta_value, $where) {
        $existingRecord = $this->select([
            'table' => $table,
            'columns' => ['COUNT(*) as count'],
            'where' => $where
        ]);

        if ($existingRecord[0]['count'] > 0) {
            $this->update($table, [$meta_key => $meta_value], $where);
        } else {
            $data = $where;
            $data[$meta_key] = $meta_value;
            $this->insert($table, $data);
        }
    }

    private function decryptData($data, $encryptionKey) {
        $decodedData = base64_decode($data);
        $iv = substr($decodedData, 0, 16);
        $encryptedData = substr($decodedData, 16);
        return openssl_decrypt($encryptedData, 'aes-256-cbc', $encryptionKey, 0, $iv);
    }
}