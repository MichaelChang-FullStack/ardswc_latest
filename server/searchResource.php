<?php
    include("config.php");
    header('Content-Type: application/json ; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('');
        // die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
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

    $resourceTypeWords = array_unique(getWordsFromData('resourceTypeNames', $bodyData));
    $topicWords = array_unique(getWordsFromData('topicNames', $bodyData));
    $resourceCategoryWords = array_unique(getWordsFromData('resourceCategoryNames', $bodyData));
    $targetWords = array_unique(getWordsFromData('targetNames', $bodyData));
    $learnClassWords = array_unique(getWordsFromData('learnClassNames', $bodyData));
    $deviceTypeWords = array_unique(getWordsFromData('deviceTypeNames', $bodyData));


    $searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name', 'BookDirectoryData', 'TC_Name');
    $filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name', 'BookDirectoryData');
    $resourceTypeColumns = array('BT_Name', 'TC_Name', 'EC_Name', 'FC_Name', 'JC_Name', 'BC_Name', 'BookDirectoryData');

    $isPushed = 'pushed' === ($bodyData['isPush']??'') ? " AND isPush = 1 " : '';

    $cteSql = "WITH RankedData AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY BookID ORDER BY BookID ASC) AS rn
        FROM dbo.VW_TA_BOOKS
        WHERE IsOnline = 1 $isPushed
      )";

    $mainSql = "SELECT BookID, Title, ShortDescrip, BC_Name, TC_Name, FC_Name, OB_Name, RS_Name, TP_Name,BT_Name, IM_FILE, CoverFileName,
    ISNULL(
	    ISNULL(ONDate, InsertDate), 
	iif('20' = SUBSTRING(BookID, 3, 2), 
			SUBSTRING(BookID, 3, 4) + '-' + 
			SUBSTRING(BookID, 7, 2) + '-' + 
			SUBSTRING(BookID, 9, 2) + ' ' + 
			SUBSTRING(BookID, 11, 2) + ':' + 
			SUBSTRING(BookID, 13, 2) + ':' + 
			SUBSTRING(BookID, 15, 2), CONVERT(datetime, CAST(SUBSTRING(BookID, 6, 5) as INT)) )
    ) as orderDate 
    FROM RankedData WHERE rn = 1";

    $params = array();
    $first = true;
    if (!empty($resourceTypeWords)) {
        $mainSql .= " AND (";
        foreach($resourceTypeColumns as $col){
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;

            if('EC_Name' === $col){
                $first = true;
                foreach ($resourceTypeWords as $word) {
                    if (!$first) {
                        $mainSql .= " OR ";
                    }
                    $first = false;
                    $mainSql .= " EC_Name LIKE ?";
                    $params[] = "%$word%";
                }
            }else{
                $mainSql .= $col . ' IN (' . implode(',', array_pad([], count($resourceTypeWords), '?')) . ')';
                // $mainSql .= $col . ' IN (' . implode(',', array_map(function($v){return "'" . $v . "'";}, $resourceTypeWords)) . ')';
                $params = array_merge_recursive($params, $resourceTypeWords);
            }
        }
        // foreach ($resourceTypeWords as $word) {
        //     if (!$first) {
        //         $mainSql .= " OR ";
        //     }
        //     $first = false;
        //     $conditions = array_map(function($col) use ($word) {
        //         return "$col = ?";
        //     }, $resourceTypeColumns);
        //     $mainSql .= implode(' OR ', $conditions);
        //     array_push($params, ...array_fill(0, count($resourceTypeColumns), $word));
        // }
        $mainSql .= ")";
    }elseif(empty($searchWords)){
        $mainSql .= " AND ( 1 = 2)";
    }
    $first = true;
    if (!empty($topicWords)) {
        // error_log(print_r($topicWords, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
        $mainSql .= " AND (";
        foreach ($topicWords as $word) {
            if (!$first) {
                $mainSql .= " OR ";
            }
            $first = false;
            $mainSql .= " TP_Name LIKE ?";
            $params[] = "%$word%";
        }
        
        // $mainSql .= ' TP_Name IN (' . implode(',', array_pad([], count($topicWords), '?')) . ')';
        // $params = array_merge_recursive($params, $topicWords);

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
        
        // $mainSql .= ' RS_Name IN (' . implode(',', array_pad([], count($resourceCategoryWords), '?')) . ')';
        // $params = array_merge_recursive($params, $resourceCategoryWords);

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

        // $mainSql .= ' OB_Name IN (' . implode(',', array_pad([], count($targetWords), '?')) . ')';
        // $params = array_merge_recursive($params, $targetWords);

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

        // $mainSql .= ' CS_Name IN (' . implode(',', array_pad([], count($learnClassWords), '?')) . ')';
        // $params = array_merge_recursive($params, $learnClassWords);

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

        // $mainSql .= ' CR_Name IN (' . implode(',', array_pad([], count($deviceTypeWords), '?')) . ')';
        // $params = array_merge_recursive($params, $deviceTypeWords);

        $mainSql .= ")";
    }
    $first = true;
    
    // error_log(print_r($searchWords, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
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

    $mainSql .= " ORDER BY orderDate DESC OFFSET " . (($pageNumber - 1) * $pageSize) . " ROWS FETCH NEXT " . $pageSize . " ROWS ONLY";
    $sql = $cteSql . " " . $mainSql;
    // error_log($sql . PHP_EOL, 3, __DIR__ . '/debug.log');
    // error_log(print_r($params, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        // error_log(print_r(sqlsrv_errors(), true) . PHP_EOL, 3, __DIR__ . '/debug.log');
        die('');
        // die(print_r(sqlsrv_errors(), true));
    }

    $json_array = array();
    while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $json_array[] = $data;
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
?>
