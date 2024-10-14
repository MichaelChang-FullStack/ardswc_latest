<?php
include("config_class.php");
header('Content-Type: application/json ; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
if (json_last_error() !== JSON_ERROR_NONE) {
    die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
}

$id = $bodyData['id'];

$sql = "SELECT
    classFacility.ClassID,
    classFacility.Class_Facility,
    classFacility.Facility_Description,
    classFacility.SeqNo AS Facility_SeqNo,
    STRING_AGG(classFacilityPic.Facility_Pic, ',') AS Facility_Pic,
    STRING_AGG(CAST(classFacilityPic.SeqNo AS VARCHAR(10)), ',') AS Facility_Pic_SeqNo
FROM
    [class].[dbo].[classFacility] AS classFacility
LEFT JOIN
    [class].[dbo].[classFacilityPic] AS classFacilityPic
ON
    classFacility.Class_Facility = classFacilityPic.Class_Facility
    AND classFacility.ClassID = classFacilityPic.ClassID
WHERE
    classFacility.ClassID = ?
GROUP BY
    classFacility.ClassID,
    classFacility.Class_Facility,
    classFacility.Facility_Description,
    classFacility.SeqNo;";

$params = array($id);

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

