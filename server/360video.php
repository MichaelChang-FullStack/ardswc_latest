<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 檢查資料庫連接是否成功
if ($conn === false) {
    $error = print_r(sqlsrv_errors(), true);
    echo json_encode(["status" => 500, "message" => "Connection failed", "error" => $error]);
    exit;
}

// 解析接收到的 JSON 數據
$data = json_decode(file_get_contents('php://input'), true);
$MNo = $data['MNo'] ?? null;
$videoname = $data['videoname'] ?? null;
$videoid = $data['videoid'] ?? null;
$apply_time = $data['apply_time'] ?? null;
$statusname = $data['statusname'] ?? null;

// 檢查是否收到 MNo
if ($MNo === null) {
    echo json_encode(["status" => 400, "message" => "Missing MNo"]);
    exit;
}

// 準備 SQL 查詢語句，根據 StatusName 和 MNo (ID) 篩選數據
$sql = "SELECT * FROM [Learn_swcb_new].[dbo].[TA_360VIDEO] WHERE ID = ? ORDER BY Apply_Time DESC";
$params = array($MNo);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    $error = print_r(sqlsrv_errors(), true);
    echo json_encode(["status" => 500, "message" => "Query failed", "error" => $error]);
    exit;
}

// 構建返回的 JSON 數據
$json_array = array();
while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $json_array[] = $data;
}

sqlsrv_close($conn);
echo json_encode($json_array);
?>
