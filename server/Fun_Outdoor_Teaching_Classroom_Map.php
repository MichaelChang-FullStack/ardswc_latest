<?php
include("config_class.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT ClassID,ClassName,Class_Map,Tel,EMail FROM dbo.ClassData  WHERE isdel=0 AND Class_Map IS NOT NULL ORDER BY ClassID ";


$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

$json_array = array();
$button = "詳細資訊"; 
while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $data['button'] = $button;
    $json_array[] = $data;
}
echo json_encode($json_array, JSON_PRETTY_PRINT);
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
