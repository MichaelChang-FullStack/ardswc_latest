<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT TOP 10 [BookID], [BT_Name], [IsOnline], [BC_Name], [JC_Name], [TC_Name], [FC_Name], [IS_Name], [Remark], [Title], [BookKeyword], [Author], [Publisher], [PubDate], [ISBN], [GPN], [ISSN], [Contact_Name], [Contact_Title], [Contact_Phone], [Contact_Mobile], [Contact_Mail], [ShortDescrip], [Language], [Purpose], [Subtitle], [Runtime], [PageNumber], [QRURL], [ADMaterial], [isCC], [ON_OFF], [ONDate], [InsertDate], [Inserter], [UpdateDate], [Updater], [isDel], [isNewBook], [isPush], [TP_Name], [RS_Name], [OB_Name], [EC_Name], [CS_Name], [CR_Name] FROM [VW_TA_BOOKS] WHERE [ON_OFF] = 1";$stmt = sqlsrv_query($conn, $sql);
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
