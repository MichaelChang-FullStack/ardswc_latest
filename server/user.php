<?php
include("config_class.php");
header('Content-Type: application/json; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => '解析 JSON 数据时发生错误: ' . json_last_error_msg()]);
    exit;
}

if (!isset($bodyData['id'])) {
    echo json_encode(['error' => 'Missing id parameter']);
    exit;
}

$id = $bodyData['id'];

// 确保连接的数据库是 Learn_swcb_new
$useDatabaseQuery = "USE Learn_swcb_new";
$useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);

if ($useDatabaseStmt === false) {
    echo json_encode(['error' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)]);
    exit;
}

$sql = "SELECT Name, Email, Mobile, Gender, Birthday, Zipcode, County, District, Address, Occupation, Role, Mpoints
        FROM dbo.TA_MEMBER_DATA a
        JOIN TA_MEMBER b ON a.RoleID = b.RoleID
        WHERE MNo = ?";

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
sqlsrv_close($conn);
