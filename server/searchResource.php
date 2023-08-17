<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }
    //Can search column
    // array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BT_Name', 'BC_Name', 'IS_Name', 'JC_Name', 'TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name', 'TC_Name', 'FC_Name', 'BC_Name', 'JC_Name')
    $queryText = $bodyData['queryText'];
    $queryFilterName = $bodyData['filterName'];
    $typeName = isset($bodyData['typeName']) ? $bodyData['typeName'] : null;
    $searchWords = !empty(trim($queryText)) ? explode(' ', $queryText) : array();
    $filterWords = !empty(trim($queryFilterName)) ? explode(',', $queryFilterName) : array();
    $typeWords = !empty(trim($typeName)) ? explode(',', $typeName) : array();
    
    $searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name');
    $filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name');
    
    $sql = "SELECT * 
        FROM dbo.VW_TA_BOOKS 
        WHERE IsOnline = 1";
    if (!empty($typeName)) {
        $sql .= " AND (";
        $typeFirst = true;
        foreach ($typeWords as $type) {
            if(!$typeFirst) {
                $sql .= " OR";
            }
            $typeFirst = false;
            $sql .= " BT_Name = '" . $type . "' OR TC_Name = '" . $type . "' OR FC_Name = '" . $type . "' OR JC_Name = '" . $type . "' OR BC_Name = '" . $type . "'";
        }
        $sql .= ")";
    }
    $params = array();
    $first = true;

    foreach ($filterWords as $word) {
        foreach($searchTextQueryColumns as $column) {
            if ($first) {
                $sql .= " AND (";
                $first = false;
            } else {
                $sql .= " OR";
            }
            $sql .= " $column = ?";
            $params[] = $word;
        }
    }
    
    if (!$first) {
        $sql .= ")";
        $first = true;
    }
    
    foreach ($searchWords as $word) {
        foreach($filterQueryColumns as $column) {
            if ($first) {
                $sql .= " OR (";
                $first = false;
            } else {
                $sql .= " OR";
            }
            $sql .= " $column = ?";
            $params[] = $word;
        }
    }
    
    if (!$first) {
        $sql .= ")";
    }
    
    $sql .= " ORDER BY ONDate DESC";
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
