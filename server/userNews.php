<?php
include("config_class.php");
header('Content-Type: application/json; charset=utf-8');

// Ensure the database connection is established
if (!isset($conn)) {
    echo json_encode(['error' => 'Database connection not established.']);
    exit;
}

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => '解析 JSON 數據時發生錯誤: ' . json_last_error_msg()]);
    exit;
}

$action = $bodyData['action'];

switch($action) {
    case 'create':
        create($bodyData);
        break;
    case 'read':
        read($bodyData);
        break;
    case 'update':
        update($bodyData);
        break;
    case 'updateAll':
        updateAll($bodyData);
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
}

function create($data) {
    global $conn; // Ensure $conn is accessible within the function

    $Subject = $data['subject'];
    $Content = $data['content'];
    $CATEGORY_NO = $data['CATEGORY_NO'];
    $CATEGORY = $data['CATEGORY'];
    $MNo = $data['MNo'];
    
    $sql_news = "INSERT INTO [Learn_swcb_new].[dbo].[NEWS]
    (NE_NO, NE_SUBJECT, NE_CONTENT, NE_CREATEDATE, NE_ISONLINE, NE_ISTOP, NE_NEWWIN,
    NE_SEND_MEMBER, NE_CATEGORY_NO, NE_CATEGORY, NE_MNo)
    VALUES
    (CONCAT('NE', FORMAT(GETDATE(), 'yyyyMMddHHmmss'), '01'), ?, ?, GETDATE(), 0, 0, 0, 1, ?, ?, ?)";
    
    $params = array($Subject, $Content, $CATEGORY_NO, $CATEGORY, $MNo);
    $stmt_news = sqlsrv_prepare($conn, $sql_news, $params);
    
    if ($stmt_news === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
    if (sqlsrv_execute($stmt_news) === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
    echo json_encode(['message' => 'Data inserted successfully.']);
}

function read($data) {
    global $conn; 

    $MNo = $data['MNo'];

    // 使用参数化查询
    $sql = "SELECT *
    FROM [Learn_swcb_new].[dbo].[NEWS]
    WHERE (NE_CATEGORY_NO IN (11, 12,13,14,15) AND NE_MNo = ?)
       OR NE_SEND_MEMBER IN (1)
    ORDER BY NE_CREATEDATE DESC";

    // 准备查询
    $stmt = sqlsrv_prepare($conn, $sql, array($MNo));
    if ($stmt === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

    // 执行查询
    $result = sqlsrv_execute($stmt);
    if ($result === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

    // 获取数据
    $json_array = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $json_array[] = $row;
    }
    
    // 输出结果
    echo json_encode($json_array, JSON_PRETTY_PRINT);

    // 释放资源
    sqlsrv_free_stmt($stmt);
}


function update($data) {
    global $conn; 

    $NO = $data['NO'];

    // 使用参数化查询
    $sql = "UPDATE [Learn_swcb_new].[dbo].[NEWS]
    SET NE_ISREAD = 1
    WHERE NE_NO = ?";

    // 准备查询
    $stmt = sqlsrv_prepare($conn, $sql, array($NO));
    if ($stmt === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

    // 执行查询
    $result = sqlsrv_execute($stmt);
    if ($result === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

  
    // 输出结果
    echo json_encode($json_array, JSON_PRETTY_PRINT);

    // 释放资源
    sqlsrv_free_stmt($stmt);
}

function updateAll($data) {
    global $conn; 

    $MNo = $data['MNo'];

    // 使用参数化查询
    $sql = "UPDATE [Learn_swcb_new].[dbo].[NEWS]
    SET NE_ISREAD = 1
    WHERE NE_MNo = ?";

    // 准备查询
    $stmt = sqlsrv_prepare($conn, $sql, array($MNo));
    if ($stmt === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

    // 执行查询
    $result = sqlsrv_execute($stmt);
    if ($result === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }

  
    // 输出结果
    echo json_encode($json_array, JSON_PRETTY_PRINT);

    // 释放资源
    sqlsrv_free_stmt($stmt);
}

function delete($data) {
    // Implement delete functionality
}

sqlsrv_close($conn);
