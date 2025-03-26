<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');
session_start();
$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => '解析 JSON 資料時發生錯誤']);
    exit;
}

// 檢查是否接收到必要的數據
if (!$bodyData || !isset($bodyData['videoid']) || !isset($bodyData['leasename']) || !isset($bodyData['mno'])) {
    echo json_encode(['success' => false, 'message' => '請登入會員下載']);
    exit;
}

// 取得表單數據
$State = '待審核';
$VideoID = $bodyData['videoid'];
$VideoName = $bodyData['videoname'];
$LeaseName = $bodyData['leasename'];
$Field = $bodyData['field'];
$Suitable = $bodyData['suitable'];
$Time = $bodyData['time'];
$Memo = $bodyData['memo'];
$MId = $bodyData['mno'];
$CreatedDate = date('Y-m-d H:i:s');
$ISDEL = 0;

// 查詢 MName
$sql_query = "SELECT Name FROM [Learn_swcb_new].[dbo].[TA_MEMBER_DATA] WHERE MNo = ?";
$stmt_query = sqlsrv_prepare($conn, $sql_query, array($MId));

if ($stmt_query === false || sqlsrv_execute($stmt_query) === false) {
    echo json_encode(['success' => false, 'message' => '查詢 MName 失敗']);
    exit;
}

$MName = null;
if ($row = sqlsrv_fetch_array($stmt_query, SQLSRV_FETCH_ASSOC)) {
    $MName = $row['Name'];
}

if (!$MName) {
    echo json_encode(['success' => false, 'message' => '未能找到對應的 MName']);
    exit;
}

// 紀錄操作日誌
$userID = $_SESSION["userID"] ?? 'unknown'; // 確保 session 不為空
$ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

$sql_log = "INSERT INTO [Learn_swcb_new].[dbo].[TA_LOG]
(IP, Account, Edit_Function, Edit_Table, LogType, LogTime)
VALUES (?, ?, '橫幅', 'MemberUpload', '編輯', Getdate())";

$stmt_log = sqlsrv_prepare($conn, $sql_log, array($ip_address, $userID));

if ($stmt_log === false || sqlsrv_execute($stmt_log) === false) {
    echo json_encode(['success' => false, 'message' => 'Log 插入失敗']);
    exit;
}

// 插入新記錄到 TA_MEMBERUPLOAD_DATA 表
$sql_insert = "INSERT INTO [Learn_swcb_new].[dbo].[TA_MEMBERUPLOAD_DATA]
(State, VideoID, VideoName ,LeaseName, Field, Suitable, Time, Memo, MName, MId, CreatedDate, ModifyDate, ISDEL)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, Getdate(), NULL, 0)";

$params = array($State, $VideoID, $VideoName, $LeaseName, $Field, $Suitable, $Time, $Memo, $MName, $MId);
$stmt_insert = sqlsrv_prepare($conn, $sql_insert, $params);

if ($stmt_insert === false || sqlsrv_execute($stmt_insert) === false) {
    echo json_encode(['success' => false, 'message' => '資料插入失敗']);
    exit;
}

echo json_encode(['success' => true, 'message' => '資料插入成功']);
sqlsrv_close($conn);
exit;
?>
