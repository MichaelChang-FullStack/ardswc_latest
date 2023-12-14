<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT TOP (10) *
    FROM dbo.VW_TA_BOOKS
    WHERE [InsertDate] IS NOT NULL
    AND ON_OFF = 1
    AND IsOnline = 1
    ORDER BY [InsertDate] DESC";
$stmt = sqlsrv_query($conn, $sql);
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
