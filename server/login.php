<?php
include("config.php");
header('Content-Type: application/json ; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
if (json_last_error() !== JSON_ERROR_NONE) {
    die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
}

$email = $bodyData['email'];
$name = $bodyData['name'];
$from = $bodyData['from'];

$sql = "SELECT *
        FROM dbo.TA_MEMBER_DATA
        WHERE Email = ? And ISDEL = 0";

$params = array($email);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(['error' => print_r(sqlsrv_errors(), true)]));
}

$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if ($result) {
    // 帳號存在，回傳結果
    echo json_encode(['status' => 'existing', 'data' => $result]);
} else {
    // 帳號不存在，新增帳號
    $uniqueCode = generateCode($conn);
    $currentTime = date('Y-m-d H:i:s');

    $insertSql = "INSERT INTO dbo.TA_MEMBER_DATA (MNo, Email, Name, ISDEL, RoleID, CreatedDate,Mpoints,RegisterFrom) 
    VALUES (?, ?, ?, 0, 1, ?,100,?)";
    $insertParams = array($uniqueCode, $email, $name, $currentTime,$from);
    $insertStmt = sqlsrv_query($conn, $insertSql, $insertParams);

    if ($insertStmt === false) {
        die(json_encode(['error' => '新增帳號失敗: ' . print_r(sqlsrv_errors(), true)]));
    }

    // 獲取新增的帳號資訊
    $newAccountSql = "SELECT * FROM dbo.TA_MEMBER_DATA WHERE Email = ? AND ISDEL = 0";
    $newAccountStmt = sqlsrv_query($conn, $newAccountSql, $params);

    if ($newAccountStmt === false) {
        die(json_encode(['error' => '獲取新帳號資訊失敗: ' . print_r(sqlsrv_errors(), true)]));
    }

    $newAccount = sqlsrv_fetch_array($newAccountStmt, SQLSRV_FETCH_ASSOC);
    echo json_encode(['status' => 'new', 'data' => $newAccount]);

    sqlsrv_free_stmt($newAccountStmt);
}

function getLatestSequenceNumber($conn)
{
    $sql = "SELECT TOP 1 RIGHT(MNo, 3) AS LastSequence
            FROM dbo.TA_MEMBER_DATA
            WHERE LEFT(MNo, 1) = 'C'
              AND SUBSTRING(MNo, 2, 4) = CONVERT(VARCHAR(4), GETDATE(), 12)
              AND ISDEL = 0
            ORDER BY MNo DESC";

    $stmt = sqlsrv_query($conn, $sql);

    if ($stmt === false) {
        die(json_encode(['error' => print_r(sqlsrv_errors(), true)]));
    }

    $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    return $result ? intval($result['LastSequence']) : 0;
}

function generateCode($conn)
{
    $currentDate = new DateTime();
    $yearMonth = $currentDate->format('ym');
    $latestSequence = getLatestSequenceNumber($conn);
    $newSequence = $latestSequence + 1;

    if ($newSequence > 999) {
        die(json_encode(['error' => '當月編號已達上限']));
    }

    $sequenceNumber = str_pad($newSequence, 3, '0', STR_PAD_LEFT);
    return "C{$yearMonth}{$sequenceNumber}";
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
