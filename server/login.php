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
    $insertSql = "INSERT INTO dbo.TA_MEMBER_DATA (MNo,Email, Name, ISDEL,RoleID) 
                    VALUES ('C240722002',?, ?, 0,1)";
    $insertParams = array($email, $name);
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
// if ($stmt === false) {
//     die(print_r(sqlsrv_errors(), true));
// }

// $json_array = array();
// while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
//     $json_array[] = $data;
// }
// echo json_encode($json_array, JSON_PRETTY_PRINT);


sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
