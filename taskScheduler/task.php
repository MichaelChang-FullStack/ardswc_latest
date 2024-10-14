<?php
include(__DIR__ . '/../server/config.php');
$config = include(__DIR__ . '/../server/config_env.php');
$sendMail_url = $config['sendMail_url'];
$addNews_url = $config['addNews_url'];
$outdoor_classroom_url = $config['outdoor_classroom_url'];

$log_file = 'C:\php-8.2.6-nts-Win32-vs16-x64\logs\php_errors.log';  
error_log("這個腳本已經被定期執行！\n", 3, $log_file);

try {    
    reviewLateNotify();
    processClassReserveEmails();

} catch (Exception $e) {
    error_log("錯誤發生：" . $e->getMessage() . "\n", 3, $log_file);
}

function processClassReserveEmails() {
    global $conn, $log_file , $outdoor_classroom_url;
    if ($conn === false) {
        echo json_encode([
            'status' => 'false',
            'message' => 'Database connection failed: ' . print_r(sqlsrv_errors(), true)
        ]);
        exit;
    }

    $useDatabaseQuery = "USE class";
    $useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);

    if ($useDatabaseStmt === false) {
        echo json_encode([
            'status' => 'false',
            'message' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)
        ]);
        exit;
    }

    $query = "SELECT * FROM dbo.ClassReserve 
              WHERE CAST(Visit_Time AS DATE) = DATEADD(day, 2, CAST(GETDATE() AS DATE))
              AND StatusId = 2";

    $stmt = sqlsrv_prepare($conn, $query);

    if ($stmt === false) {
        error_log('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        exit('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true));
    }

    if (sqlsrv_execute($stmt)) {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

            sendEmail($row['Serial_Id'], [$row['Email']], 'reminder_visit_date');

            $currentDateTime = date('Y-m-d H:i:s');
            $visitDateTime = $row['Visit_Time'];
            $formattedVisitDateTime = $visitDateTime->format('Y-m-d H:i:s');

            $data = [
                'action' => 'create',
                'subject' => "提醒您，您已預約於兩天後（{$formattedVisitDateTime}）參訪【{$row['Class_Name']}】", 
                'SOURCE_NO' => $outdoor_classroom_url,
                'CATEGORY_NO' => 11,
                'CATEGORY' => '戶外教室參訪',
                'MNo' => $row['MNo'], 
            ];
            createNewsAndMemberStatus($data);

            $classData = getClassDataById($row['ClassID']);

            if ($classData) {
                  $content="[農村水保署水保酷學堂－戶外教室系統]親愛的 【{$row['Name']}】 您好：　　您已預約於兩天後（【{$formattedVisitDateTime}】）參訪【{$row['Class_Name']}】，請準備好愉快的心情和學習的精神，準時抵達戶外教室！我們誠摯地期待您的到來。
            【{$classData['Contact']}{$classData['Tel']}{$classData['EMail']}】申請單號：【{$row['Serial_Id']}】 詳情可至水保酷學堂>會員專區>戶外教室參訪>歷年紀錄 查看。";

            insertSmsWorkList($row['Phone'], $row['Name'], $content);
            } else {
                echo "No data found for Class ID";
            }          

            error_log("{$row['Serial_Id']} {$currentDateTime}\n", 3, $log_file);
        }
        error_log("業務邏輯成功執行。\n", 3, $log_file);
    } else {
        error_log('Failed to execute query: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        exit('Failed to execute query: ' . print_r(sqlsrv_errors(), true));
    }
}

function getClassDataById($id) {
    global $conn, $log_file;

    // 检查数据库连接
    if ($conn === false) {
        error_log('Database connection failed: ' . print_r(sqlsrv_errors(), true), 3, $log_file);
        return false; // 返回 false 表示失败
    }

    // 查询 SQL 语句
    $query = "SELECT * FROM dbo.ClassData WHERE ClassID = ?";
    $params = array($id);

    // 准备查询语句
    $stmt = sqlsrv_prepare($conn, $query, $params);

    // 检查准备是否成功
    if ($stmt === false) {
        error_log('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        return false;
    }

    // 执行查询
    if (sqlsrv_execute($stmt)) {
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        if ($row) {
            return $row;  // 返回单行结果
        } else {
            return null;  // 没有找到数据
        }
    } else {
        error_log('Failed to execute query: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        return false;
    }
}

function getAdminaByClassId($id) {
    global $conn, $log_file;

    // 檢查資料庫連接
    if ($conn === false) {
        error_log('Database connection failed: ' . print_r(sqlsrv_errors(), true), 3, $log_file);
        return false; // 返回 false 表示失敗
    }

    // 查詢 SQL 語句
    $sql = "SELECT US_EMAIL
            FROM [Learn_swcb_new].[dbo].[USERS]
            WHERE (US_AUTHORITY = 'A1')
              OR (US_AUTHORITY = 'A2' AND ClassID = ?)
              OR (US_AUTHORITY = 'A3' AND ClassID = ?)
            AND US_ISDEL <> 1;";

    // 傳遞兩個相同的 ClassID 參數
    $params = array($id, $id);

    // 準備查詢語句
    $stmt = sqlsrv_prepare($conn, $sql, $params);

    // 檢查準備是否成功
    if ($stmt === false) {
        error_log('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        return [];
    }

    // 執行查詢
    if (sqlsrv_execute($stmt)) {
        $json_array = array();
        while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $email = trim($data['US_EMAIL']); // 去除左右空白
            if (!empty($email) && !is_null($email)) { // 排除空字符串和 NULL
                $json_array[] = $email; // 只返回 email
            }
        }
        return array_unique($json_array);  // 無論結果是否為空，始終返回陣列
    } else {
        error_log('Failed to execute query: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        return []; // 返回空陣列表示失敗
    }
}

function reviewLateNotify() {
    global $conn, $log_file , $outdoor_classroom_url;
    $today = new DateTime();
    $today->modify('-3 days');  
    $threeDaysAgo = $today->format('Y-m-d');

    if ($conn === false) {
        echo json_encode([
            'status' => 'false',
            'message' => 'Database connection failed: ' . print_r(sqlsrv_errors(), true)
        ]);
        exit;
    }

    $useDatabaseQuery = "USE class";
    $useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);

    if ($useDatabaseStmt === false) {
        echo json_encode([
            'status' => 'false',
            'message' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)
        ]);
        exit;
    }

    $query = "SELECT * 
    FROM dbo.ClassReserve 
    WHERE Visit_Time >= DATEADD(day, -5, CAST(GETDATE() AS DATE)) 
    AND Visit_Time < DATEADD(day, -3, CAST(GETDATE() AS DATE)) 
    AND StatusId = 1;";

    $stmt = sqlsrv_prepare($conn, $query);

    if ($stmt === false) {
        error_log('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        exit('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true));
    }

    if (sqlsrv_execute($stmt)) {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

            
            $adminMail = getAdminaByClassId($row['ClassID']);

            // error_log(print_r($adminMail, true));

            if (!is_array($adminMail)) {
                $adminMail = []; // 將 $adminMail 設置為空陣列
            }

            sendEmail($row['Serial_Id'], $adminMail, 'notification_deadline');

            error_log("{$row['Serial_Id']} \n", 3, $log_file);
        }
        error_log("業務邏輯成功執行。\n", 3, $log_file);
    } else {
        error_log('Failed to execute query: ' . print_r(sqlsrv_errors(), true) . "\n", 3, $log_file);
        exit('Failed to execute query: ' . print_r(sqlsrv_errors(), true));
    }
}

function sendEmail($id, $email, $templateName) {
    global $sendMail_url, $log_file;
    $url = $sendMail_url;

    $data = [
        "templateName" => $templateName,
        "id" => $id,
        "email" => $email
    ];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));  

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode >= 200 && $httpCode < 300) {
            $result = json_decode($response, true);
            if ($result) {
                print_r($result);
            } else {
                echo "Invalid JSON response: $response";
            }
        } else {
            echo "HTTP error! Status: $httpCode";
        }
    }

    curl_close($ch);
    error_log("sendEmail 成功執行。\n", 3, $log_file);
}

function addNews($MNo,$visitDateTime,$className) {
    global $addNews_url, $outdoor_classroom_url;
    $url = $addNews_url;
    $formattedVisitDateTime = $visitDateTime->format('Y-m-d H:i:s');
    $data = [
        'action' => 'create',
        'subject' => "提醒您，您已預約於兩天後（{$formattedVisitDateTime}）參訪【{$className}】", 
        'SOURCE_NO' => $outdoor_classroom_url,
        'CATEGORY_NO' => 11,
        'CATEGORY' => '戶外教室參訪',
        'MNo' => $MNo, 
    ];

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
    } else {
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($http_status != 200) {
            echo "HTTP error! Status: $http_status";
        } else {
            $result = json_decode($response, true);
            echo "Server response: ";
            print_r($result);
        }
    }

    curl_close($ch);
}

function createNewsAndMemberStatus($data) {
    global $conn , $log_file;
    $Subject = $data['subject'];
    $CATEGORY_NO = $data['CATEGORY_NO'];
    $CATEGORY = $data['CATEGORY'];
    $MNo = $data['MNo'];
    $NE_NO = 'NE' . date('YmdHis') . '01'; // 生成 NE_NO
    $ReadTimestamp = date('Y-m-d H:i:s');  // 当前时间戳
    $Content = $data['content'] ?? null;   // 内容可为空
    $SOURCE_NO = $data['SOURCE_NO'] ?? null; // SOURCE_NO 可为空

    // 插入 NEWS 表的 SQL
    $sql_news = "INSERT INTO [Learn_swcb_new].[dbo].[NEWS]
    (NE_NO, NE_SUBJECT, NE_CONTENT, NE_CREATEDATE, NE_ISONLINE, NE_ISTOP, NE_NEWWIN,
    NE_SEND_MEMBER, NE_CATEGORY_NO, NE_CATEGORY, NE_MNo, NE_SOURCE_NO)
    VALUES
    (?, ?, ?, GETDATE(), 0, 0, 0, 1, ?, ?, ?, ?)";
    
    // SQL 参数
    $params_news = array($NE_NO, $Subject, $Content, $CATEGORY_NO, $CATEGORY, $MNo, $SOURCE_NO);

    // 准备并执行 NEWS 表插入操作
    $stmt_news = sqlsrv_prepare($conn, $sql_news, $params_news);
    if ($stmt_news === false) {
        return ['status' => 'error', 'message' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)];
    }

    if (sqlsrv_execute($stmt_news) === false) {
        return ['status' => 'error', 'message' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)];
    }

    // 插入 MemberNewsStatus 表的 SQL
    $sql_member_status = "INSERT INTO [Learn_swcb_new].[dbo].[MemberNewsStatus]
    ([MNo], [NewsNO], [HasRead], [ReadTimestamp])
    VALUES (?, ?, 0, ?)";

    // SQL 参数
    $params_member_status = array($MNo, $NE_NO, $ReadTimestamp);

    // 准备并执行 MemberNewsStatus 表插入操作
    $stmt_member_status = sqlsrv_prepare($conn, $sql_member_status, $params_member_status);
    if ($stmt_member_status === false) {
        return ['status' => 'error', 'message' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)];
    }

    if (sqlsrv_execute($stmt_member_status) === false) {
        return ['status' => 'error', 'message' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)];
    }

    error_log("createNewsAndMemberStatus 成功執行。\n", 3, $log_file);
    // 如果两个表都插入成功，返回成功消息
    return ['status' => 'success', 'message' => 'Data inserted successfully into both NEWS and MemberNewsStatus.'];
}

function insertSmsWorkList($cellphone, $name, $content) {
    global $log_file;

    $serverName = "172.16.58.28"; 
    $connectionOptions = array(
        "Database" => "femaDB",  
        "Uid" => "learning",     
        "PWD" => "7F751bf7b96049b49c517B38c94C3557",     
        "CharacterSet" => "UTF-8"     
    );

    $conn2 = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn2 === false) {
        return array("status" => "error", "message" => sqlsrv_errors());
    }

    if (empty($cellphone) || empty($name)) {
        return array("status" => "error", "message" => "Missing required parameters");
    }

    $sql = "INSERT INTO [femadb].[dbo].[tblSmsWorkList] 
            (payTime, cellphone, [Name], [status], content, [send], schedular, sendTYPE)
            VALUES (GETDATE(), ?, ?, -2, ?, 0, GETDATE(), 3001)";

    $params = array($cellphone, $name, $content);

    $stmt = sqlsrv_query($conn2, $sql, $params);

    if ($stmt === false) {
        $response = array("status" => "error", "message" => sqlsrv_errors());
    } else {
        $response = array("status" => "success", "message" => "New record created successfully");
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn2);

    error_log("insertSmsWorkList 成功執行。\n", 3, $log_file);
    return $response;
}
?>


