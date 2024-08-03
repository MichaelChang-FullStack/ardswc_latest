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
                if(!empty($request_body['bookId']??'')){
                    include("db.php");
                    $db = new DB;

                    $sql = "SELECT PracticalLevel, PushLevel
                        FROM dbo.TA_FEEDBACK
                        WHERE ID = ?
                        ";

                    $params = [$request_body['bookId']];
                    
                    $res = $db->query($sql, $params);
                }
                break;
            case 'user':
                if(!empty($request_body['MNo']??'')){
                    include("db.php");
                    $db = new DB;

                    $today = date('Y-m-d');

                    $sql = "SELECT Name, Email, Mobile, Gender, Birthday, Zipcode, County, District, Address, Occupation, Role, Mpoints, 
                        ISNULL(push.RecordId, 0) as Push,
                        ISNULL(picbook.RecordId, 0) as Picbook,
                        ISNULL(video.RecordId, 0) as Video,
                        ISNULL(game.RecordId, 0) as Game,
                        ISNULL(plan_.RecordId, 0) as Plan_
                        FROM dbo.TA_MEMBER_DATA a
                        JOIN TA_MEMBER b
                        ON a.RoleID = b.RoleID
                        LEFT JOIN TA_DAILY_RECORDS push
                        ON push.MemberNo = a.MNo
                        AND CAST(DATEPART(YY, push.Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, push.Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, push.Completed) AS CHAR(3)), 2) = '$today'
                        AND push.Task = 'push'
                        LEFT JOIN TA_DAILY_RECORDS picbook
                        ON picbook.MemberNo = a.MNo
                        AND CAST(DATEPART(YY, picbook.Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, picbook.Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, picbook.Completed) AS CHAR(3)), 2) = '$today'
                        AND picbook.Task = 'picbook'
                        LEFT JOIN TA_DAILY_RECORDS video
                        ON video.MemberNo = a.MNo
                        AND CAST(DATEPART(YY, video.Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, video.Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, video.Completed) AS CHAR(3)), 2) = '$today'
                        AND video.Task = 'video'
                        LEFT JOIN TA_DAILY_RECORDS game
                        ON game.MemberNo = a.MNo
                        AND CAST(DATEPART(YY, game.Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, game.Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, game.Completed) AS CHAR(3)), 2) = '$today'
                        AND game.Task = 'game'
                        LEFT JOIN TA_DAILY_RECORDS plan_
                        ON plan_.MemberNo = a.MNo
                        AND CAST(DATEPART(YY, plan_.Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, plan_.Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, plan_.Completed) AS CHAR(3)), 2) = '$today'
                        AND plan_.Task = 'plan'
                        WHERE MNo = ?
                        ";
                        // error_log($sql . PHP_EOL, 3, __DIR__ . '/debug.log');

                    $params = [$request_body['MNo']];
                    
                    $res = $db->query($sql, $params);
                }
                break;
            case 'daily':
                if(!empty($request_body['MNo']??'')){
                    include("db.php");
                    $db = new DB;

                    $today = date('Y-m-d');

                    $sql = "SELECT *
                        FROM dbo.TA_DAILY_RECORDS
                        WHERE MNo = ?
                        AND CAST(DATEPART(YY, Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, Completed) AS CHAR(3)), 2) = '$today'
                        ";

                    $params = [$request_body['MNo']];
                    
                    $res = $db->query($sql, $params);
                }
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
            case 'user':
                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    $pairs = [
                        // "Email" => $request_body['email']??'',
                        "Name" => $request_body['name']??'',
                        "Gender" => $request_body['gender']??'',
                        "Mobile" => $request_body['mobile']??'',
                        "ZipCode" => $request_body['zipcode']??'',
                        "County" => $request_body['county']??'',
                        "District" => $request_body['district']??'',
                        "Address" => $request_body['address']??'',
                        "Occupation" => $request_body['occupation']??'',
                        "ModifyDate" => date('Y-m-d H:i:s'),
                    ];
                    if(!empty($request_body['birthday']??'')){
                        $pairs['Birthday'] = $request_body['birthday'];
                    }
                    $pairs = implode(',', array_map(function($key) use($pairs){
                        return "{$key} = '{$pairs[$key]}'";
                    }, array_keys($pairs)));

                    include("db.php");
                    $db = new DB;

                    $sql = "UPDATE dbo.TA_MEMBER_DATA
                    SET $pairs
                    WHERE MNo = '$MNo'";

                    $db->query($sql);
                }
                break;
            case 'daily':
                $MNo = $request_body['MNo']??'';
                $Task = $request_body['Task']??'';

                // error_log(print_r($request_body, true), 3, __DIR__ . '/debug.log');
                if(!empty($MNo) && !empty($Task)){
                    include("db.php");
                    $db = new DB;

                    $now = date('Y-m-d H:i:s');
                    $today = substr($now, 0, 10);
                    $sql = "SELECT * FROM dbo.TA_DAILY_RECORDS
                    WHERE MemberNo = '$MNo'
                    AND Task = '$Task'
                    AND CAST(DATEPART(YY, Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, Completed) AS CHAR(3)), 2) = '$today'";

                    $records = $db->query($sql);
                    // error_log(print_r($records, true), 3, __DIR__ . '/debug.log');
                    
                    if('db error!' !== $records && empty($records)){
                        $sql = "INSERT INTO dbo.TA_DAILY_RECORDS(MemberNo, Task, Completed)
                        VALUES('$MNo', '$Task', '$now')";

                        $res = $db->query($sql);

                        $sql = "UPDATE dbo.TA_MEMBER_DATA
                        SET Mpoints = Mpoints + 5,
                        Apoints = Apoints +5
                        WHERE MNo = '$MNo'";
                        $db->query($sql);

                        $res = 'done!';
                    }
                }
                break;
            default:
                // error_log(print_r($request_body, true), 3, __DIR__ . '/debug.log');
                
        }
        
        return $res;
    }
}
new Routes;