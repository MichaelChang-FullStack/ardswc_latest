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
    $searchWords = !empty(trim($queryText)) ? explode(' ', $queryText) : array();
    $filterWords = !empty(trim($queryFilterName)) ? explode(',', $queryFilterName) : array();
    
    $searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BT_Name', 'BC_Name', 'IS_Name', 'JC_Name');
    $filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name', 'BT_Name', 'TC_Name', 'FC_Name', 'BC_Name', 'JC_Name');
    
    if(!empty($searchWords) && empty($filterWords)) {
        $columns = $searchTextQueryColumns;
    }
    else if(!empty($searchWords) && !empty($filterWords)) {
        $columns = array_values(array_unique(array_merge($searchTextQueryColumns, $filterQueryColumns)));
    }
    else if(empty($searchWords) && !empty($filterWords)) {
        $columns = $filterQueryColumns;
    }
    else {
        $columns = array();
    }
    
    $queryLists = $searchWords + $filterWords;
    $sql = "SELECT * FROM dbo.VW_TA_BOOKS WHERE IsOnline = 1"; 
    $params = array();
    $first = true;
    foreach ($queryLists as $word) {
        foreach($columns as $column) {
            if ($first) {
                $sql .= " AND (";
                $first = false;
            } else {
                $sql .= " OR";
            }
            $sql .= " $column LIKE ?";
            $params[] = "%$word%";
        }
    }
    if (!$first) {
        $sql .= ")";
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
