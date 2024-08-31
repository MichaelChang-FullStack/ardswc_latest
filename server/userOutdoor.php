<?php
include("config_class.php");
header('Content-Type: application/json; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => '解析 JSON 数据时发生错误: ' . json_last_error_msg()]);
    exit;
}

if (!isset($bodyData['id'])||!isset($bodyData['method']) ) {
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

$id = $bodyData['id'];

// 确保连接的数据库是 class
$useDatabaseQuery = "USE class";
$useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);

if ($useDatabaseStmt === false) {
    echo json_encode(['error' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)]);
    exit;
}

// 检查 HTTP 请求的方法
$method = $bodyData['method'];

switch ($method) {
    case 'GET':
        // 执行查询操作
        $sql = "SELECT *
                FROM dbo.ClassReserve
                WHERE MNo = ? ORDER BY Appli_Time DESC";
        $params = array($id);
        $stmt = sqlsrv_query($conn, $sql, $params);

        if ($stmt === false) {
            echo json_encode(['error' => sqlsrv_errors()]);
            exit;
        }

        $json_array = array();
        while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $json_array[] = $data;
        }

        if (empty($json_array)) {
            echo json_encode(['error' => 'No data found']);
        } else {
            echo json_encode($json_array, JSON_PRETTY_PRINT);
        }

        sqlsrv_free_stmt($stmt);
        break;

    case 'PUT':
        // 构建 SQL 语句
        $sqlUpdate = "UPDATE dbo.ClassReserve 
        SET StatusId = 4, StatusName = '已取消'
        WHERE Serial_Id = ?";

        $params = array($id);

        // 执行更新操作
        $stmtUpdate = sqlsrv_query($conn, $sqlUpdate, $params);

        if ($stmtUpdate === false) {
            echo json_encode(['error' => 'Update failed: ' . print_r(sqlsrv_errors(), true)]);
            exit;
        } else {
            echo json_encode(['success' => 'Record updated successfully']);
        }

        sqlsrv_free_stmt($stmtUpdate);
        break;

    default:
        echo json_encode(['error' => 'Unsupported request method']);
        break;
}

sqlsrv_close($conn);
