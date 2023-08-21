<?php
include("config_class.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT Id,Country,SchoolName,[Attribute] AS Attribute ,BaseType ,URL,Area,Category,Class_Map FROM dbo.ClassDataIndoor WHERE Class_Map IS NOT NULL AND DATALENGTH(Class_Map) > 0 AND Del_Flag=0 ORDER BY Id";


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
