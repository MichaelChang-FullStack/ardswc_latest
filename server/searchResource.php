<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
    }
    //Can search column
    function getWordsFromData($name, $bodyData) {
        $names = $bodyData[$name];
        return !empty(trim($names)) ? explode(',', $names) : array();
    }
    $pageSize = 10;
    $queryText = $bodyData['queryText'];
    $pageNumber = (int) $bodyData['pageNumber'];
    $searchWords = !empty(trim($queryText)) ? explode(' ', $queryText) : array();

    $resourceTypeWords = getWordsFromData('resourceTypeNames', $bodyData);
    $topicWords = getWordsFromData('topicNames', $bodyData);
    $resourceCategoryWords = getWordsFromData('resourceCategoryNames', $bodyData);
    $targetWords = getWordsFromData('targetNames', $bodyData);
    $learnClassWords = getWordsFromData('learnClassNames', $bodyData);
    $deviceTypeWords = getWordsFromData('deviceTypeNames', $bodyData);


    $searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name');
    $filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name');
    $resourceTypeColumns = array('BT_Name', 'TC_Name', 'FC_Name', 'JC_Name', 'BC_Name');

    $cteSql = "WITH RankedData AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY BookID ORDER BY BookID ASC) AS rn
        FROM dbo.VW_TA_BOOKS
        WHERE IsOnline = 1
      )";

    $mainSql = "SELECT * FROM RankedData WHERE rn = 1";

    $params = array();
    $first = true;
    if (!empty($resourceTypeWords)) {
        $mainSql .= " AND (";
        foreach ($resourceTypeWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $conditions = array_map(function($col) use ($word) {
                return "$col = ?";
            }, $resourceTypeColumns);
            $mainSql .= implode(' OR ', $conditions);
            array_push($params, ...array_fill(0, count($resourceTypeColumns), $word));
        }
        $mainSql .= ")";
    }
    $first = true;
    if (!empty($topicWords)) {
        $mainSql .= " AND (";
        foreach ($topicWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " TP_Name LIKE ?";
            $params[] = "%$word%";
        }
        $mainSql .= ")";
    }
    $first = true;
    if (!empty($resourceCategoryWords)) {
        $mainSql .= " AND (";
        foreach ($resourceCategoryWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " RS_Name LIKE ?";
            $params[] = "%$word%";
        }
        $mainSql .= ")";
    }
    $first = true;
    if (!empty($targetWords)) {
        $mainSql .= " AND (";
        foreach ($targetWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " OB_Name LIKE ?";
            $params[] = "%$word%";
        }
        $mainSql .= ")";
    }
    $first = true;
    if (!empty($learnClassWords)) {
        $mainSql .= " AND (";
        foreach ($learnClassWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " CS_Name LIKE ?";
            $params[] = "%$word%";
        }
        $mainSql .= ")";
    }
    $first = true;
    if (!empty($deviceTypeWords)) {
        $mainSql .= " AND (";
        foreach ($deviceTypeWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " CR_Name LIKE ?";
            $params[] = "%$word%";
        }
        $mainSql .= ")";
    }
    $first = true;
    foreach ($searchWords as $word) {
        foreach($searchTextQueryColumns as $column) {
            if ($first) {
                $mainSql .= " AND (";
                $first = false;
            } else {
                $mainSql .= " OR";
            }
            $mainSql .= " $column LIKE ?";
            $params[] = "%$word%";
        }
    }
    if (!$first) {
        $mainSql .= ")";
    }

    $mainSql .= "ORDER BY BookID DESC OFFSET " . (($pageNumber - 1) * $pageSize) . " ROWS FETCH NEXT " . $pageSize . " ROWS ONLY";
    $sql = $cteSql . " " . $mainSql;
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
