<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT TOP 10 SeqNo,BannerName FROM dbo.Banners WHERE OnLine=1 ORDER BY StartDate DESC";

$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

$rows = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
}

if (empty($rows)) {
    echo "No data found.";
} else {
    $formattedData = array();
    foreach ($rows as $row) {
        $formattedData[] = array(
            'SeqNo' => $row['SeqNo'],
            'BannerName' => $row['BannerName'],
        );
    }

    $jsonData = json_encode($formattedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($jsonData === false) {
        echo "Error encoding JSON: " . json_last_error_msg();
    } else {
        echo $jsonData;
    }
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
