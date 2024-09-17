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
    $CATEGORY_NO = $data['CATEGORY_NO'];
    $CATEGORY = $data['CATEGORY'];
    $MNo = $data['MNo'];
    $NE_NO = 'NE' . date('YmdHis') . '01';
    $ReadTimestamp = date('Y-m-d H:i:s');
    $Content = $data['content'] ?? null;
    $SOURCE_NO = $data['SOURCE_NO']?? null;
    
    $sql_news = "INSERT INTO [Learn_swcb_new].[dbo].[NEWS]
    (NE_NO, NE_SUBJECT, NE_CONTENT, NE_CREATEDATE, NE_ISONLINE, NE_ISTOP, NE_NEWWIN,
    NE_SEND_MEMBER, NE_CATEGORY_NO, NE_CATEGORY, NE_MNo,NE_SOURCE_NO)
    VALUES
    (?, ?, ?, GETDATE(), 0, 0, 0, 1, ?, ?, ?,?)";
    
    $params = array($NE_NO, $Subject, $Content, $CATEGORY_NO, $CATEGORY, $MNo,$SOURCE_NO);
    $stmt_news = sqlsrv_prepare($conn, $sql_news, $params);
    
    if ($stmt_news === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
    if (sqlsrv_execute($stmt_news) === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
   
    // 插入 MemberNewsStatus 表
    $sql_member_status = "INSERT INTO [Learn_swcb_new].[dbo].[MemberNewsStatus]
    ([MNo], [NewsNO], [HasRead], [ReadTimestamp])
    VALUES (?, ?,0,?)";
    
    $params_status = array($MNo, $NE_NO, $ReadTimestamp);
    $stmt_member_status = sqlsrv_prepare($conn, $sql_member_status, $params_status);
    
    if ($stmt_member_status === false) {
        echo json_encode(['error' => 'SQL preparation error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
    if (sqlsrv_execute($stmt_member_status) === false) {
        echo json_encode(['error' => 'SQL execution error: ' . print_r(sqlsrv_errors(), true)]);
        exit;
    }
    
    echo json_encode(['message' => 'Data inserted successfully into both NEWS and MemberNewsStatus.']);
}


function read($data) {
    global $conn; 

    $MNo = $data['MNo'];

    // 使用参数化查询
    $sql = "    SELECT *
    FROM [Learn_swcb_new].[dbo].[NEWS] as a 
    left join [Learn_swcb_new].[dbo].[MemberNewsStatus] as b ON a.NE_NO = b.NewsNO 
    WHERE b.MNo =  ?
	and  a.NE_SEND_MEMBER = 1 
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
    $MNo = $data['MNo'];

    // 使用参数化查询
    $sql = "UPDATE [Learn_swcb_new].[dbo].[MemberNewsStatus] 
    SET HasRead = 1
    WHERE NewsNO = ? and MNo = ?";

    // 准备查询
    $stmt = sqlsrv_prepare($conn, $sql, array($NO,$MNo));
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
    $sql = "UPDATE [Learn_swcb_new].[dbo].[MemberNewsStatus]
    SET HasRead = 1
    WHERE MNo = ?";

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
