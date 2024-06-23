<?php
class Routes{
    public function __construct(){
        header('Content-Type: application/json ; charset=utf-8');
        
        $request_method = $_SERVER['REQUEST_METHOD'];
        
        $res = '';
        switch($request_method){
            case 'GET':
                $res = $this->get();
                break;
            case 'POST':
                $res = $this->post();
                break;
        }
        
        echo json_encode($res);
    }

    private function get(){
        $res = '';

        $request_body = $_GET;

        switch($request_body['action']??''){
            case 'feedback':
                include("db.php");
                $db = new DB;

                $sql = "SELECT *
                    FROM dbo.TA_FEEDBACK
                    ";

                $params = array();
                
                $res = $db->query($sql, $params);
                
                break;
        }

        return $res;
    }

    private function post(){
        $res = '';

        $jsonData = file_get_contents('php://input');
        $request_body = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
        if (json_last_error() !== JSON_ERROR_NONE) {
            $request_body =[
                'err' => '解析 JSON 時發生錯誤: ' . json_last_error_msg()
            ];
        }

        switch($_GET['action']??''){
            case 'feedback':
                $pairs = [
                    'ID' => $request_body['id']??'',
                    'Name' => $request_body['name'],
                    'PracticalLevel' => $request_body['practical_level']??'',
                    'PushLevel' => $request_body['push_level']??'',
                    'Steer' => $request_body['steer']??'',
                    'FeedbackDate' => date('Y-m-d H:i:s'),
                ];
                $columns = implode(',', array_keys($pairs));
                $values = array_values($pairs);
                $holders = implode(',', array_pad([], count($pairs), '?'));

                include("db.php");
                $db = new DB;

                $sql = "INSERT INTO dbo.TA_FEEDBACK($columns)
                VALUES($holders)";

                $res = $db->query($sql, $values);

                break;
        }
        
        return $res;
    }
}
new Routes;