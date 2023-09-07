<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }

    $id = $bodyData['id'];
    $BookDirectoryData = $bodyData['BookDirectoryData'];

    $insertSql = "INSERT INTO TA_BOOKS_DIRECTORY (BookID, BookDirectoryData) VALUES (?, ?)";
    $insertParams = array($id, $BookDirectoryData);

    $insertStmt = sqlsrv_query($conn, $insertSql, $insertParams);
    if ($insertStmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    echo json_encode(array("status" => "success"), JSON_PRETTY_PRINT);

    sqlsrv_free_stmt($insertStmt);
    sqlsrv_close($conn);
?>
