<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }
    //Can search column
    function getWordsFromData($name, $bodyData) {
        $names = $bodyData[$name];
        return !empty(trim($names)) ? explode(',', $names) : array();
    }
    
    $resourceTypeWords = getWordsFromData('resourceTypeNames', $bodyData);
    $topicWords = getWordsFromData('topicNames', $bodyData);
    $resourceCategoryWords = getWordsFromData('resourceCategoryNames', $bodyData);
    $targetWords = getWordsFromData('targetNames', $bodyData);
    $learnClassWords = getWordsFromData('learnClassNames', $bodyData);
    $deviceTypeWords = getWordsFromData('deviceTypeNames', $bodyData);

    
    $searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name');
    $filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name');
    $resourceTypeColumns = array('BT_Name', 'TC_Name', 'FC_Name', 'JC_Name', 'BC_Name');
    
    $sql = "SELECT * FROM dbo.VW_TA_BOOKS WHERE IsOnline = 1";
    
    $params = array();
    $first = true;
    if (!empty($resourceTypeWords)) {
        $sql .= " AND (";
        foreach ($resourceTypeWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $conditions = array_map(function($col) use ($word) {
                return "$col = ?";
            }, $resourceTypeColumns);
            $sql .= implode(' OR ', $conditions);
            array_push($params, ...array_fill(0, count($resourceTypeColumns), $word)); 
        }
        $sql .= ")";
    }
    $first = true;
    if (!empty($topicWords)) {
        $sql .= " AND (";
        foreach ($topicWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $sql .= " TP_Name LIKE ?";
            $params[] = "%$word%";
        }
        $sql .= ")";
    }
    $first = true;
    if (!empty($resourceCategoryWords)) {
        $sql .= " AND (";
        foreach ($resourceCategoryWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $sql .= " RS_Name LIKE ?";
            $params[] = "%$word%";
        }
        $sql .= ")";
    }
    $first = true;
    if (!empty($targetWords)) {
        $sql .= " AND (";
        foreach ($targetWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $sql .= " OB_Name LIKE ?";
            $params[] = "%$word%";
        }
        $sql .= ")";
    }
    $first = true;
    if (!empty($learnClassWords)) {
        $sql .= " AND (";
        foreach ($learnClassWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $sql .= " CS_Name LIKE ?";
            $params[] = "%$word%";
        }
        $sql .= ")";
    }
    $first = true;
    if (!empty($deviceTypeWords)) {
        $sql .= " AND (";
        foreach ($deviceTypeWords as $word) {
            if (!$first) {
                $sql .= " OR ";
            }
            $first = false;
            $sql .= " CR_Name LIKE ?";
            $params[] = "%$word%";
        }
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
