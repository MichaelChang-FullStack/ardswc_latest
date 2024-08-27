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
$bookid = $data['bookid'] ?? null;

// 檢查是否收到 MNo
if ($bookid === null) {
    echo json_encode(["status" => 400, "message" => "Missing bookid"]);
    exit;
}

// 準備 SQL 查詢語句，根據 FC_Name 和 bookid 篩選數據
$sql = "SELECT BookID, Title, FC_Name, isDel FROM [Learn_swcb_new].[dbo].[TA_BOOKS] WHERE BookID = ? AND FC_Name = '360影片' AND isDel = 0 AND Title = ?";
$params = array($bookid);

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
