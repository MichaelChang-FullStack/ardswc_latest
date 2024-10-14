<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Get AL_NO from query parameters
$AL_NO = isset($_GET['AL_NO']) ? $_GET['AL_NO'] : null;

if ($AL_NO === null) {
    die(json_encode(["error" => "AL_NO parameter is required"]));
}

// SQL query to count images where IM_NO matches the provided AL_NO (assuming IM_NO references AL_NO)
$sql = "SELECT COUNT(*) AS imageCount
        FROM dbo.IMAGES
        WHERE IM_SOURCE_NO = ? AND IM_ISDEL = 0"; // Filter non-deleted images

// Prepare the statement with the AL_NO parameter passed in as IM_NO
$params = array($AL_NO);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Fetch the count result
$imageCount = 0;
if ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $imageCount = $data['imageCount'];
}

// Return the count as JSON
echo json_encode(["imageNumber" => $imageCount], JSON_PRETTY_PRINT);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
