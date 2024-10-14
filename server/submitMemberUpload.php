<?php
include("config.php");
header('Content-Type: application/json ; charset=utf-8');
$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
if (json_last_error() !== JSON_ERROR_NONE) {
    die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
}

// 檢查是否成功接收到數據
if (!$bodyData || !isset($bodyData['videoid']) || !isset($bodyData['leasename']) || !isset($bodyData['mno'])) {
    echo json_encode(['success' => false, 'message' => '請登入會員下載', 'data' => $bodyData]);
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
$CreatedDate = date('Y-m-d H:i:s'); // 使用 PHP 取得當前時間
$ISDEL = 0;

// 查詢 MName
$sql_query = "SELECT Name FROM [Learn_swcb_new].[dbo].[TA_MEMBER_DATA] WHERE MNo = ?";
$stmt_query = sqlsrv_prepare($conn, $sql_query, array($MId));

if ($stmt_query === false) {
    error_log(print_r(sqlsrv_errors(), true));
    echo json_encode(['error' => '查詢 MName 失敗']);
    exit;
}

if (sqlsrv_execute($stmt_query) === false) {
    error_log(print_r(sqlsrv_errors(), true));
    echo json_encode(['error' => '查詢 MName 失敗']);
    exit;
}

$MName = null;
if ($row = sqlsrv_fetch_array($stmt_query, SQLSRV_FETCH_ASSOC)) {
    $MName = $row['Name'];
}

if (!$MName) {
    echo json_encode(['error' => '未能找到對應的 MName']);
    exit;
}

// 紀錄操作日誌
$userID = $_SESSION["userID"];
$ip_address = $_SERVER['REMOTE_ADDR'];

$sql_log = "INSERT INTO [Learn_swcb_new].[dbo].[TA_LOG]
(IP, Account, Edit_Function, Edit_Table, LogType, LogTime)
VALUES
(?, ?, '橫幅', 'MemberUpload', '編輯', Getdate())";

$stmt_log = sqlsrv_prepare($conn, $sql_log, array($ip_address, $userID));

if ($stmt_log === false) {
    error_log(print_r(sqlsrv_errors(), true));
    echo json_encode(['error' => 'Log 插入失敗']);
    exit;
}

if (sqlsrv_execute($stmt_log) === false) {
    error_log(print_r(sqlsrv_errors(), true));
    echo json_encode(['error' => 'Log 插入失敗']);
    exit;
}

// 插入新記錄到 TA_MEMBERUPLOAD_DATA 表
$sql_insert = "INSERT INTO [Learn_swcb_new].[dbo].[TA_MEMBERUPLOAD_DATA]
(State, VideoID, VideoName ,LeaseName, Field, Suitable, Time, Memo, MName, MId, CreatedDate, ModifyDate, ISDEL)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, Getdate(), NULL, 0)";

$params = array($State, $VideoID, $VideoName, $LeaseName, $Field, $Suitable, $Time, $Memo, $MName, $MId);
$stmt_insert = sqlsrv_prepare($conn, $sql_insert, $params);

if ($stmt_insert === false) {
    error_log('SQL Prepare Error: ' . print_r(sqlsrv_errors(), true)); // 除錯：記錄準備語句的錯誤
    echo json_encode(['error' => '資料插入失敗，準備語句錯誤']);
    exit;
}

if (sqlsrv_execute($stmt_insert) === false) {
    error_log('SQL Execute Error: ' . print_r(sqlsrv_errors(), true)); // 除錯：記錄執行語句的錯誤
    echo json_encode(['error' => '資料插入失敗，執行語句錯誤']);
    exit;
}

echo json_encode(['success' => true, 'message' => '資料插入成功']);
sqlsrv_close($conn);
exit;
?>
