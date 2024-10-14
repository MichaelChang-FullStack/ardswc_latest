<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }
    
    $id = $bodyData['id'];
    
    $sql = "SELECT US_EMAIL
    FROM [Learn_swcb_new].[dbo].[USERS]
    WHERE (US_AUTHORITY = 'A1')
        OR (US_AUTHORITY = 'A2' AND ClassID = ?)
        OR (US_AUTHORITY = 'A3' AND ClassID = ?)
    AND US_ISDEL <> 1;";

    $params = array($id, $id);
    
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    $json_array = array();
    while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $email = trim($data['US_EMAIL']); // 去除左右空白
        if (!empty($email) && !is_null($email)) { // 排除空字符串和 NULL
            $json_array[] = $data;
        }
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
?>
