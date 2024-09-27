<?php
    include("config_class.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }
    
    $id = $bodyData['id'];
    
    $sql = "SELECT 
    Days, 
    CONVERT(VARCHAR(5), StartTime, 108) AS StartTime,  -- 只取时和分
    CONVERT(VARCHAR(5), EndTime, 108) AS EndTime,      -- 只取时和分
    ClassID, 
    Des, 
    IsHoliday
FROM [Learn_swcb_new].[dbo].[TA_WORK_SCHEDULE]
        WHERE ClassID = ?"; 

    $params = array($id);
    
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    $json_array = array();
    while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $json_array[] = $data;
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
?>
