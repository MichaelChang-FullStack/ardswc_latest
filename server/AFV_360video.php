<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 解析接收到的 JSON 數據
$data = json_decode(file_get_contents("php://input"), true);

// 檢查是否成功接收到數據
if (!$data || !isset($data['bookId']) || !isset($data['memberId']) || !isset($data['createdTime'])) {
    echo json_encode(['success' => false, 'message' => '請登入會員下載', 'data' => $data]);
    exit;
}

// 獲取資料
$bookId = $data['bookId'];
$memberId = $data['memberId'];
$apply_time = $data['createdTime'];

// 從資料庫中根據 BookID 抓取 Title
$sql_title = "SELECT Title FROM [Learn_swcb_new].[dbo].[TA_BOOKS] WHERE BookID = ?";
$params_title = array($bookId);
$stmt_title = sqlsrv_query($conn, $sql_title, $params_title);

if ($stmt_title === false) {
    echo json_encode(['success' => false, 'message' => '查詢 Title 時發生錯誤：' . sqlsrv_errors()]);
    exit;
}

$title = null;
if ($row_title = sqlsrv_fetch_array($stmt_title, SQLSRV_FETCH_ASSOC)) {
    $title = $row_title['Title'];
}

sqlsrv_free_stmt($stmt_title);

if (!$title) {
    echo json_encode(['success' => false, 'message' => '未找到對應的 Title']);
    exit;
}

// 從另一個表中根據 MNo 抓取申請人姓名
$sql_name = "SELECT Name FROM [Learn_swcb_new].[dbo].[TA_MEMBER_DATA] WHERE MNo = ?";
$params_name = array($memberId);
$stmt_name = sqlsrv_query($conn, $sql_name, $params_name);

if ($stmt_name === false) {
    echo json_encode(['success' => false, 'message' => '查詢申請人姓名時發生錯誤：' . sqlsrv_errors()]);
    exit;
}

$name = null;
if ($row_name = sqlsrv_fetch_array($stmt_name, SQLSRV_FETCH_ASSOC)) {
    $name = $row_name['Name'];
}

sqlsrv_free_stmt($stmt_name);

if (!$name) {
    echo json_encode(['success' => false, 'message' => '未找到對應的申請人姓名']);
    exit;
}

// 準備 SQL 語句來插入資料
$sql = "INSERT INTO [Learn_swcb_new].[dbo].[TA_360VIDEO] (VideoName, Name, ID, Apply_Time, StatusId, StatusName, VideoID) VALUES (?, ?, ?, ?, 1, '待審核', ?)";
$params = array($title, $name, $memberId, $apply_time, $bookId);
$stmt = sqlsrv_query($conn, $sql, $params);

// 檢查 SQL 執行是否成功
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => '寫入資料庫時發生錯誤：' . sqlsrv_errors()]);
} else {
    echo json_encode(['success' => true, 'message' => '申請成功']);
}

// 釋放資源並關閉連接
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
