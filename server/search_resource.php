<?php
include("config.php");
header('Content-Type: application/json ; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
if (json_last_error() !== JSON_ERROR_NONE) {
    die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
}
$queryString = $bodyData['queryString'];
$searchWords = explode(' ', $queryString);

$sql = "SELECT * FROM dbo.VW_TA_BOOKS WHERE 1=0"; 
$params = array();
foreach ($searchWords as $word) {
    foreach(['Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BT_Name', 'BC_Name', 'IS_Name', 'JC_Name'] as $column) {
        $sql .= " OR $column LIKE ?";
        $params[] = "%$word%";
    }
}
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

$json_array = array();
while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $json_array[] = $data;
}
echo json_encode($json_array, JSON_PRETTY_PRINT);
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
