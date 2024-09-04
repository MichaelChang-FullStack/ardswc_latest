<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 檢查資料庫連接是否成功
if ($conn === false) {
    $error = print_r(sqlsrv_errors(), true);
    echo json_encode(["status" => 500, "message" => "Connection failed", "error" => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

// 解析接收到的 JSON 數據
$data = json_decode(file_get_contents('php://input'), true);
$NE_NO = $data['NE_NO'] ?? null;

// 檢查是否收到 NE_NO
if ($NE_NO === null) {
    echo json_encode(["status" => 400, "message" => "Missing NE_NO"], JSON_UNESCAPED_UNICODE);
    exit;
}

// 準備 SQL 查詢語句，根據 NE_NO 篩選數據
$sql = "SELECT * FROM [Learn_swcb_new].[dbo].[NEWS] WHERE NE_NO = ?";
$params = array($NE_NO);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    $error = print_r(sqlsrv_errors(), true);
    echo json_encode(["status" => 500, "message" => "Query failed", "error" => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

// 構建返回的 JSON 數據
$json_array = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $json_array[] = $row;
}

sqlsrv_close($conn);
echo json_encode($json_array, JSON_UNESCAPED_UNICODE);
?>
