<?php
require_once 'db.php';
require_once 'Points.php';

use \Ardswc\User\Points;

class Routes{
    public function __construct(){
        header('Content-Type: application/json ; charset=utf-8');
        
        $request_method = $_SERVER['REQUEST_METHOD'];
        
        $res = '';

        // error_log(print_r($_SERVER, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
        try{
            switch($request_method){
                case 'GET':
                    $res = $this->get();
                    break;
                case 'POST':
                    $res = $this->post();
                    break;
                // case 'DELETE':
                //     $res = $this->delete();
                //     break;
            }
        }catch(\Throwable $e){
            error_log(print_r($e, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
            $res = 'please check the error log!';
        }
        echo json_encode($res);
    }

    private function get(){
        $res = '';

        $request_body = $_GET;

        switch($request_body['action']??''){
            case 'feedback':
                if(!empty($request_body['bookId']??'')){
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
                    $db = new DB;

                    $today = date('Y-m-d');

                    $sql = "SELECT Name, Email, Mobile, Gender, Birthday, Zipcode, County, District, Address, Occupation, a.RoleID, Role, Mpoints, Avatar, 
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
                    $db = new DB;

                    $today = date('Y-m-d');

                    $sql = "SELECT Task
                        FROM dbo.TA_DAILY_RECORDS
                        WHERE MemberNo = ?
                        AND CAST(DATEPART(YY, Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, Completed) AS CHAR(3)), 2) = '$today'
                        ";

                    $params = [$request_body['MNo']];
                    
                    $res = $db->query($sql, $params);

                    if(is_array($res) && !empty($res)){
                        $res = array_map(function($v){
                            return $v['Task'];
                        }, $res);
                    }else{
                        $res = [];
                    }
                }
                break;
            case 'favorite':
                $MNo = $request_body['MNo']??'';
                $bookId = $request_body['bookId']??'';

                if(!empty($MNo) && !empty($bookId)){
                    $db = new DB;

                    $sql = "SELECT fav.MetaValue as favorites, count FROM dbo.TA_MEMBER_METAS fav
                    JOIN (SELECT 
                    count(*) as count
                    FROM dbo.TA_MEMBER_METAS
                    WHERE MetaKey = 'favorites'
                    AND MetaValue = ?
                    OR MetaValue LIKE ?
                    OR MetaValue LIKE ?
                    OR MetaValue LIKE ?) counts
                    ON 1 = 1
                    WHERE MemberNo = ?
                    AND MetaKey = 'favorites'";

                    $params = [$bookId, "%,$bookId", "%,$bookId,%", "$bookId,%", $MNo];

                    $res = $db->query($sql, $params);

                    if(is_array($res) && !empty($res)){
                        $res = $res[0];
                    }
                }
                break;
            case 'favBooks':
                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    $db = new DB;

                    $sql = "SELECT fav.MetaValue as bookIds FROM dbo.TA_MEMBER_METAS fav
                    WHERE MemberNo = ?
                    AND MetaKey = 'favorites'";

                    $params = [$MNo];

                    $res = $db->query($sql, $params);

                    if(is_array($res) && !empty($res)){
                        $bookIds = array_filter(explode(',', $res[0]['bookIds']));
                        
                        if(!empty($bookIds)){
                            $where = implode(',', array_pad([], count($bookIds), '?'));

                            $sql = "SELECT BookID, Title, ShortDescrip, BC_Name, TC_Name, FC_Name, OB_Name, RS_Name, TP_Name,BT_Name, IM_FILE, CoverFileName
                            FROM VW_TA_BOOKS
                            WHERE BookID IN ($where)";

                            $res = $db->query($sql, $bookIds);
                        }else{
                            $res = [];
                        }
                    }
                }
                break;
            case 'achievements':
                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    $db = new DB;

                    $sql = "SELECT
                        MAX(CASE WHEN m.MetaKey = 'achievements-book' THEN m.MetaValue END) AS book,
                        MAX(CASE WHEN m.MetaKey = 'achievements-knowledge' THEN m.MetaValue END) AS knowledge,
                        MAX(CASE WHEN m.MetaKey = 'achievements-gamer' THEN m.MetaValue END) AS gamer
                    FROM 
                        dbo.TA_MEMBER_METAS m
                    WHERE 
                        m.MetaKey IN ('achievements-book', 'achievements-knowledge', 'achievements-gamer')
                        AND m.MemberNo = ?
                    GROUP BY 
                        m.MemberNo;
                    ";

                    $params = [$MNo];

                    $res = $db->query($sql, $params);

                    if(is_array($res)){
                        if(!empty($res)){
                            $res = array_map(function($achievement){
                                if(empty(trim($achievement))){
                                    $achievement = '';
                                }
                                return array_filter(explode(',', $achievement));
                            }, $res[0]);
                        }else{
                            $res = [
                                'book' => [],
                                'knowledge' => [],
                                'gamer' => [],
                            ];
                        }
                    }
                }
                break;
            case 'achievementsCompleted':
                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    $completes = [
                        'book' => 50,
                        'knowledge' => 50,
                        'gamer' => 20,
                    ];

                    $db = new DB;
                    
                    $sql = "SELECT 
                        -- MAX(book) as book, 
                        -- MAX(knowledge) as knowledge, 
                        -- MAX(gamer) as gamer,
                        MAX(book_completed) as book_completed,
                        MAX(knowledge_completed) as knowledge_completed,
                        MAX(gamer_completed) as gamer_completed,
                        SUM(LEN(book) - LEN(REPLACE(book, ',', ''))) AS book_count,
                        SUM(LEN(knowledge) - LEN(REPLACE(knowledge, ',', ''))) AS knowledge_count,
                        SUM(LEN(gamer) - LEN(REPLACE(gamer, ',', ''))) AS gamer_count
                    FROM (
                        SELECT
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievements-book' THEN m.MetaValue END), '') AS book,
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievements-knowledge' THEN m.MetaValue END), '') AS knowledge,
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievements-gamer' THEN m.MetaValue END), '') AS gamer,
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievement-book_completed' THEN m.MetaValue END), '') AS book_completed,
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievement-knowledge_completed' THEN m.MetaValue END), '') AS knowledge_completed,
                            ISNULL(MAX(CASE WHEN m.MetaKey = 'achievement-gamer_completed' THEN m.MetaValue END), '') AS gamer_completed
                        FROM 
                            dbo.TA_MEMBER_METAS m
                        WHERE 
                            m.MetaKey IN ('achievements-book', 'achievements-knowledge', 'achievements-gamer', 'achievement-book_completed', 'achievement-knowledge_completed', 'achievement-gamer_completed')
                            AND m.MemberNo = ?
                        GROUP BY 
                            m.MemberNo
                    ) AS book_data;
                    ";

                    $params = [$MNo];

                    $res = $db->query($sql, $params);

                    if(is_array($res) && !empty($res)){
                        $res = $res[0];

                        foreach($completes as $name => $max){
                            if(empty($res[$name . '_completed']??'') && ($res[$name . '_count']??0) >= ($max-1)){
                                $points = new Points($MNo);
                                $points->add([
                                    'point' => 50,
                                    'MNo' => $MNo,
                                ]);

                                $achievementName = 'achievement-' . $name . '_completed';
                                date_default_timezone_set('Asia/Taipei');
                                $value = date('Y-m-d H:i:s');
                                $sql = "INSERT INTO TA_MEMBER_METAS (MemberNo, MetaKey, MetaValue)
                                VALUES(?, ?, ?)";

                                $params = [$MNo, $achievementName, $value];
                                
                                $db->query($sql, $params);
                            }
                        }
                    }
                }
                break;
            case 'isAdmin':
                require_once 'Admin.php';
                $Admin = new \Ardswc\Frontend\Admin;
                $res = $Admin->is_admin();
                break;
            case 'signin':
                $res = '';

                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    date_default_timezone_set('Asia/Taipei');
                    $today = date('Ymd');
                    $this_year = date('Y');
                    $this_month = date('n');
                    
                    $db = new DB;

                    $sql = "SELECT MetaValue FROM dbo.TA_MEMBER_METAS
                    WHERE MemberNo = ?
                    AND MetaKey = 'signin'";

                    $params = [$MNo];

                    $meta_value = $db->query($sql, $params);

                    if('db error!' !== $meta_value){
                        $meta_value = explode(',', $meta_value[0]['MetaValue']);
                        // $meta_value = array_filter($meta_value, function($date){
                        //     return substr($date, 0, 6) == date('Ym');
                        // });
                        $meta_value = array_values($meta_value);
                    }
                    $res = $meta_value;
                }
                break;
            case 'userLevel':
                $points = new Points($request_body['MNo']??'');
                $res = $points->check_levels($request_body['MNo']??'');
                break;
            case 'prizes':
                $db = new DB;

                $sql = "SELECT a.[PrizeId], [Title], [Cost], [Amount], [Image], [Category], [Created], Vouchers
                FROM dbo.TA_PRIZES a
                LEFT JOIN (
                    SELECT PrizeId, MetaValue as Vouchers
                    FROM TA_PRIZE_METAS
                    WHERE MetaKey = 'Vouchers'
                ) b ON a.PrizeId = b.PrizeId
                WHERE IsOnline = 1
                ORDER BY Created DESC";

                $res = $db->query($sql, []);
                // error_log(print_r($res, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
                // $res = $db->select([
                //     'table' => 'TA_PRIZES',
                //     'order' => 'Created DESC',
                //     'where' => [
                //         'IsOnline' => 1,
                //     ],
                // ]);
                // error_log(print_r($res, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
                break;
            case 'prize_records':
                $MNo = $request_body['MNo']??'';

                if(!empty($MNo)){
                    $db = new DB;

                    $sql = "SELECT * FROM TA_PRIZE_RECORDS a
                    LEFT JOIN (
                        SELECT PrizeId, Cost, Title, Category FROM TA_PRIZES
                    ) b ON a.PrizeId = b.PrizeId
                    LEFT JOIN (
                        SELECT MNo, Name, Mobile, Address FROM TA_MEMBER_DATA
                    ) c ON a.MemberNo = c.MNo
                    WHERE MemberNo = ?
                    ORDER BY a.Created DESC";

                    $params = [$MNo];

                    $res = $db->query($sql ,$params);
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

        if('delete' === strtolower($request_body['VM_METHOD']??'')){
            $res = $this->delete($request_body);
        }else{
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
                    if(empty($pairs['PracticalLevel'])){
                        $pairs['PracticalLevel'] = 0;
                    }
                    if(empty($pairs['PushLevel'])){
                        $pairs['PushLevel'] = 0;
                    }
                    $columns = implode(',', array_keys($pairs));
                    $values = array_values($pairs);
                    $holders = implode(',', array_pad([], count($pairs), '?'));

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

                        $db = new DB;

                        $sql = "UPDATE dbo.TA_MEMBER_DATA
                        SET $pairs
                        WHERE MNo = ?";

                        $params = [$MNo];

                        $db->query($sql, $params);
                    }
                    break;
                case 'daily':
                    $MNo = $request_body['MNo']??'';
                    $Task = $request_body['Task']??'';

                    // error_log(print_r($request_body, true), 3, __DIR__ . '/debug.log');
                    if(!empty($MNo) && !empty($Task)){
                        $db = new DB;

                        $now = date('Y-m-d H:i:s');
                        $today = substr($now, 0, 10);
                        $sql = "SELECT * FROM dbo.TA_DAILY_RECORDS
                        WHERE MemberNo = ?
                        AND Task = ?
                        AND CAST(DATEPART(YY, Completed) AS CHAR(4)) + '-' + RIGHT(CAST(100 + DATEPART(MM, Completed) AS CHAR(3)), 2) + '-' + RIGHT(CAST(100 + DATEPART(DD, Completed) AS CHAR(3)), 2) = '$today'";

                        $params = [$MNo, $Task];

                        $records = $db->query($sql, $params);
                        // error_log(print_r($records, true), 3, __DIR__ . '/debug.log');
                        
                        if('db error!' !== $records && empty($records)){
                            $sql = "INSERT INTO dbo.TA_DAILY_RECORDS(MemberNo, Task, Completed)
                            VALUES('$MNo', '$Task', '$now')";

                            $res = $db->query($sql);

                            $points = new Points($MNo);
                            $points->add([
                                'point' => 5,
                                'MNo' => $MNo,
                            ]);

                            $res = 'done!';
                        }
                    }
                    break;
                case 'favorite':
                    $MNo = $request_body['MNo']??'';
                    $bookId = $request_body['bookId']??'';

                    if(!empty($MNo) && !empty($bookId)){
                        $db = new DB;

                        $sql = "SELECT MetaValue FROM dbo.TA_MEMBER_METAS
                        WHERE MemberNo = ?
                        AND MetaKey = 'favorites'";

                        $params = [$MNo];

                        $meta_value = $db->query($sql, $params);
                        
                        if('db error!' !== $meta_value){
                            if(empty($meta_value)){
                                $sql = "INSERT INTO TA_MEMBER_METAS (MemberNo, MetaKey, MetaValue)
                                VALUES(?, 'favorites', ?)";

                                $params = [$MNo, $bookId];
                            }else{
                                $meta_value = explode(',', $meta_value[0]['MetaValue']);
                                if(!in_array($bookId, $meta_value)){
                                    $meta_value = array_filter($meta_value);
                                    array_push($meta_value, $bookId);

                                    $sql = "UPDATE TA_MEMBER_METAS
                                    SET MetaValue = ?
                                    WHERE MemberNo = ?
                                    AND MetaKey = 'favorites'";

                                    $params = [implode(',', $meta_value), $MNo];
                                }else{
                                    $sql = '';
                                }
                            }

                            $db->query($sql, $params);

                            $res = 'done!';
                        }
                    }
                    break;
                case 'achievements':
                    $MNo = $request_body['MNo']??'';
                    $bookId = $request_body['bookId']??'';
                    $achievement = $request_body['Achievement']??'';

                    if(!empty($MNo) && !empty($bookId) && !empty($achievement)){
                        $db = new DB;

                        $achievementName = 'achievements-' . $achievement;

                        $sql = "SELECT MetaValue FROM dbo.TA_MEMBER_METAS
                        WHERE MemberNo = ?
                        AND MetaKey = ?";

                        $params = [$MNo, $achievementName];

                        $meta_value = $db->query($sql, $params);
                        
                        if('db error!' !== $meta_value){
                            if(empty($meta_value)){
                                $sql = "INSERT INTO TA_MEMBER_METAS (MemberNo, MetaKey, MetaValue)
                                VALUES(?, ?, ?)";

                                $params = [$MNo, $achievementName, $bookId];
                            }else{
                                $meta_value = explode(',', $meta_value[0]['MetaValue']);
                                if(!in_array($bookId, $meta_value)){
                                    $meta_value = array_filter($meta_value);
                                    array_push($meta_value, $bookId);

                                    $sql = "UPDATE TA_MEMBER_METAS
                                    SET MetaValue = ?
                                    WHERE MemberNo = ?
                                    AND MetaKey = ?";

                                    $params = [implode(',', $meta_value), $MNo, $achievementName];
                                }else{
                                    $sql = '';
                                }
                            }

                            if(!empty($sql)){
                                $db->query($sql, $params);

                                $points = new Points($MNo);
                                $points->add([
                                    'point' => 5,
                                    'MNo' => $MNo,
                                    'boost' => true,
                                ]);
                            }

                            $res = 'done!';
                        }
                    }
                    break;
                case 'signin':
                    $MNo = $request_body['MNo']??'';

                    if(!empty($MNo)){
                        $db = new DB;

                        $sql = "SELECT MetaValue FROM dbo.TA_MEMBER_METAS
                        WHERE MemberNo = ?
                        AND MetaKey = 'signin'";

                        $params = [$MNo];

                        $meta_value = $db->query($sql, $params);
                        
                        if('db error!' !== $meta_value){
                            $point = 0;

                            date_default_timezone_set('Asia/Taipei');
                            $today = date('Ymd');
                            $this_year = date('Y');
                            $this_month = date('n');

                            if(empty($meta_value)){
                                $sql = "INSERT INTO TA_MEMBER_METAS (MemberNo, MetaKey, MetaValue)
                                VALUES(?, 'signin', ?)";

                                $params = [$MNo, $today];

                                $point = 1;
                            }else{
                                $meta_value = explode(',', $meta_value[0]['MetaValue']);
                                if(!in_array($today, $meta_value)){
                                    $meta_value = array_filter($meta_value);
                                    array_push($meta_value, $today);

                                    $sql = "UPDATE TA_MEMBER_METAS
                                    SET MetaValue = ?
                                    WHERE MemberNo = ?
                                    AND MetaKey = 'signin'";

                                    $params = [implode(',', $meta_value), $MNo];


                                    $yesterday = date('Ymd', strtotime('-1 day'));

                                    $consecutiveDates = [];
                                    $di = -1;

                                    // 反向遍歷日期陣列
                                    for ($i = count($meta_value) - 1; $i >= 0; $i--) {
                                        $date = $meta_value[$i];

                                        if (in_array($date, [$yesterday, $today])) {
                                            $consecutiveDates[] = $date;
                                            if($yesterday == $date){
                                                $di--;
                                            }
                                        } elseif ($date == date('Ymd', strtotime($di-- . ' day'))) {
                                            $consecutiveDates[] = $date;
                                        } else {
                                            break;
                                        }
                                    }
                                    $consecutiveDates = array_reverse($consecutiveDates);

                                    $day_count = count($consecutiveDates);
                                    
                                    switch($day_count%7){
                                        case 1:
                                        case 2:
                                        case 3:
                                            $point = 1;
                                            break;
                                        case 4:
                                        case 5:
                                        case 6:
                                            $point = 2;
                                            break;
                                        case 0:
                                            $point = 3;
                                    }
                                }else{
                                    $sql = '';
                                }
                            }

                            $db->query($sql, $params);

                            if($point > 0){
                                $last_day_of_month = date('Ymd', mktime(0, 0, 0, $this_month + 1, 0, $this_year));
                                $days = date('j', mktime(0, 0, 0, $this_month + 1, 0, $this_year));

                                if(27 === $day_count){
                                    $point += 2;
                                }

                                $points = new Points($MNo);
                                $points->add([
                                    'point' => $point,
                                    'MNo' => $MNo,
                                    'boost' => true,
                                ]);
                            }

                            $res = [
                                'msg' => 'done!',
                                'point' => $point,
                            ];
                        }
                    }
                    break;
                case 'prize_records':
                    $MNo = $request_body['MNo']??'';
                    $PrizeId = $request_body['PrizeId']??'';
                    $Amount = $request_body['Amount']??'';

                    if(!empty($MNo) && !empty($PrizeId) && !empty($Amount)){
                        $db = new DB;

                        $sql = "SELECT Title, Category, Cost, Amount, Vouchers
                        FROM TA_PRIZES a
                        LEFT JOIN (
                            SELECT PrizeId, MetaValue as Vouchers
                            FROM TA_PRIZE_METAS
                            WHERE MetaKey = 'Vouchers'
                        ) b ON a.PrizeId = b.PrizeId
                        WHERE a.PrizeId = ?";
                        $params = [$PrizeId];

                        $prize = $db->query($sql, $params);
                        // error_log(print_r($prize, true) . PHP_EOL, 3, __DIR__ . '/debug.log');

                        $member = $db->select([
                            'table' => 'TA_MEMBER_DATA',
                            'where' => [
                                'MNo' => $MNo,
                            ],
                        ]);

                        if(!empty($prize)){
                            $prize = $prize[0];
                        }
                        $res = $prize;

                        $data = [
                            'title' => $prize['Title'],
                            'category' => $prize['Category'],
                            'cost' => $prize['Cost'],
                        ];
                        if(!empty($member)){
                            $member = $member[0];
                            $data = array_merge($data, [
                                'name' => $member['Name'],
                                'address' => $member['County'] . $member['District'] . $member['Address'],
                            ]);
                        }

                        $total_cost = intval($prize['Cost'])*intval($Amount);
                        if(intval($member['Mpoints']??0) >= $total_cost){
                            $has_stock = true;
                            switch($prize['Category']){
                                case '電子票券':
                                    if(!empty($prize['Vouchers']??'')){
                                        $vouchers = json_decode($prize['Vouchers'], true);

                                        $send = array_slice($vouchers, 0, $Amount);
                                        $new = array_slice($vouchers, $Amount);
                    
                                        $db->update('TA_PRIZE_METAS', [
                                            'MetaValue' => json_encode($new),
                                        ], [
                                            'PrizeId' => $PrizeId,
                                            'MetaKey' => 'Vouchers',
                                        ]);
                                    }else{
                                        $has_stock = false;
                                    }
                                    break;
                                case '實體獎品':
                                    if(!empty($prize['Amount']??0)){
                                        $db->update('TA_PRIZES', [
                                            'Amount' => $prize['Amount'] - intval($Amount),
                                            'Updated' => date('Y-m-d H:i:s'),
                                        ], [
                                            'PrizeId' => $PrizeId,
                                        ]);
                                    }else{
                                        $has_stock = false;
                                    }
                                    break;
                            }

                            if($has_stock){
                                $record_id = $db->insert('TA_PRIZE_RECORDS', [
                                    'PrizeId' => $PrizeId,
                                    'MemberNo' => $MNo,
                                    'Status' => '處理中',
                                    'Amount' => $Amount,
                                    'Data' => json_encode($data),
                                ]);

                                $points = new Points($MNo);
                                $points->minus([
                                    'point' => $prize['Cost']*$Amount
                                ]);
                                
                                // 動態消息 & 信件通知
                                $news_content = '';
                                switch($prize['Category']){
                                    case '實體獎品':
                                        require_once __DIR__ . '/mailers/prize-apply.php';
                                        $mailer = new PrizeApplyEmailSender;
                                        $news_content = '您的點數兌換' . $prize['Category'] . '【' . $prize['Title'] . '】申請已成功提交，我們將盡快審核申請，並寄送禮品。';
                                        break;
                                    case '電子票券':
                                        require_once __DIR__ . '/mailers/prize-apply-digital.php';
                                        $mailer = new PrizeApplyDigitalEmailSender;
                                        $news_content = '您的點數兌換' . $prize['Category'] . '【' . $prize['Title'] . '】申請已成功提交，我們會儘快確認，一經確認，電子票券將發送至您的註冊電子信箱。';
                                        break;
                                }

                                require_once __DIR__ . '/class-userNews.php';

                                $news = new \Ardswc\User\News;
                                $news->handleAction([
                                    'action' => 'create',
                                    'subject' => '已提交' . $prize['Category'] . '兌換申請',
                                    'CATEGORY_NO' => '14',
                                    'MNo' => $MNo,
                                    'content' => $news_content,
                                    // 'SOURCE_NO' => $_SERVER['HTTP_REFERER']??'', //消息連結
                                ]);

                                $mailto = $member['Email'];
                                $mail_subject = '[農村水保署水保酷學堂－點數兌換系統] 已收到點數兌換申請通知：已收到您會員點數兌換【' . $prize['Title'] . '】的申請（' . $member['MNo'] . '）';
                                $mail_body = $mailer->get_template();
                                $mail_body = strtr($mail_body, [
                                    '{{id}}' => $record_id,
                                    '{{name}}' => $member['Name'],
                                    '{{prize_title}}' => $prize['Title'],
                                    '{{apply_date}}' => date('Y-m-d H:i:s'),
                                    '{{cost}}' => $total_cost,
                                    '{{phone}}' => $member['Mobile'],
                                    '{{address}}' => $member['County'] . $member['District'] . $member['Address'],
                                    '{{button}}' => '<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">處理中</button>'
                                ]);
                                
                                $mailer->sendEmail($mailto, $mail_subject, $mail_body);
                            }else{
                                $res = '庫存不足!';
                            }
                        }else{
                            $res = '點數不足!';
                        }
                    }
                    break;
                default:
                    // error_log(print_r($request_body, true), 3, __DIR__ . '/debug.log');
                    
            }
        }
        return $res;
    }

    private function delete($request_body = ''){
        $res = '';

        if('' === $request_body){
            $jsonData = file_get_contents('php://input');
            $request_body = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
            if (json_last_error() !== JSON_ERROR_NONE) {
                $request_body =[
                    'err' => '解析 JSON 時發生錯誤: ' . json_last_error_msg()
                ];
            }
        }

        switch($_GET['action']??''){
            case 'favorite':
                $MNo = $request_body['MNo']??'';
                $bookId = $request_body['bookId']??'';

                if(!empty($MNo) && !empty($bookId)){
                    $db = new DB;

                    $sql = "SELECT MetaValue FROM dbo.TA_MEMBER_METAS
                    WHERE MemberNo = ?
                    AND MetaKey = 'favorites'";

                    $params = [$MNo];

                    $meta_value = $db->query($sql, $params);
                    
                    if('db error!' !== $meta_value){
                        if(empty($meta_value)){
                            $sql = '';
                        }else{
                            $meta_value = explode(',', $meta_value[0]['MetaValue']);
                            if(in_array($bookId, $meta_value)){
                                $meta_value = array_filter($meta_value);
                                unset($meta_value[array_search($bookId, $meta_value)]);

                                $sql = "UPDATE TA_MEMBER_METAS
                                SET MetaValue = ?
                                WHERE MemberNo = ?
                                AND MetaKey = 'favorites'";

                                $params = [implode(',', $meta_value), $MNo];
                            }else{
                                $sql = '';
                            }
                        }

                        $db->query($sql, $params);

                        $res = 'done!';
                    }
                }
                break;
        }

        return $res;
    }
}
new Routes;