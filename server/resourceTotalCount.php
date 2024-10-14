<?php
include("config.php");
header('Content-Type: application/json ; charset=utf-8');

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true); // 将 JSON 数据解析为 PHP 数组
if (json_last_error() !== JSON_ERROR_NONE) {
    die('解析 JSON 数据时发生错误: ' . json_last_error_msg());
}
//Can search column
function getWordsFromData($name, $bodyData)
{
    $names = $bodyData[$name];
    return !empty(trim($names)) ? explode(',', $names) : array();
}
$queryText = $bodyData['queryText'];
$searchWords = !empty(trim($queryText)) ? explode(' ', $queryText) : array();

$resourceTypeWords = getWordsFromData('resourceTypeNames', $bodyData);
$topicWords = getWordsFromData('topicNames', $bodyData);
$resourceCategoryWords = getWordsFromData('resourceCategoryNames', $bodyData);
$targetWords = getWordsFromData('targetNames', $bodyData);
$learnClassWords = getWordsFromData('learnClassNames', $bodyData);
$deviceTypeWords = getWordsFromData('deviceTypeNames', $bodyData);

$searchTextQueryColumns = array('Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name', 'BookDirectoryData', 'TC_Name');
$filterQueryColumns = array('TP_Name', 'RS_Name', 'OB_Name', 'EC_Name', 'CS_Name', 'CR_Name');
$resourceTypeColumns = array('BT_Name', 'TC_Name', 'EC_Name', 'FC_Name', 'JC_Name', 'BC_Name', 'BookDirectoryData');

$isPushed = 'pushed' === ($bodyData['isPush'] ?? '') ? " AND isPush = 1 " : '';

$cteSql = "WITH RankedData AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY BookID ORDER BY BookID ASC) AS rn
        FROM dbo.VW_TA_BOOKS
        WHERE IsOnline = 1 $isPushed
      )";

$mainSql = "SELECT COUNT(*) FROM RankedData WHERE rn = 1";

$params = array();
$first = true;
if (!empty($resourceTypeWords)) {
    $mainSql .= " AND (";
    foreach ($resourceTypeWords as $word) {
        if (!$first) {
            $mainSql .= " OR ";
        }
        $first = false;
        $conditions = array_map(function ($col) use ($word) {
            return "$col = ?";
        }, $resourceTypeColumns);
        $mainSql .= implode(' OR ', $conditions);
        array_push($params, ...array_fill(0, count($resourceTypeColumns), $word));
    }
    $mainSql .= ")";
} elseif (empty($searchWords)) {
    $mainSql .= " AND ( 1 = 2)";
}
// 開始處理其他條件，這些條件之間使用 OR
$firstOrGroup = true;
$orGroupSql = ""; // 儲存 OR 組的條件

// 處理 topicWords
if (!empty($topicWords)) {
    if (!$firstOrGroup) {
        $orGroupSql .= " OR ";
    }
    $firstInner = true;
    $orGroupSql .= "(";
    foreach ($topicWords as $word) {
        if (!$firstInner) {
            $orGroupSql .= " OR ";
        }
        $firstInner = false;
        $orGroupSql .= " TP_Name LIKE ?";
        $params[] = "%$word%";
    }
    $orGroupSql .= ")";
    $firstOrGroup = false;
}

// 處理 resourceCategoryWords
if (!empty($resourceCategoryWords)) {
    if (!$firstOrGroup) {
        $orGroupSql .= " OR ";
    }
    $firstInner = true;
    $orGroupSql .= "(";
    foreach ($resourceCategoryWords as $word) {
        if (!$firstInner) {
            $orGroupSql .= " OR ";
        }
        $firstInner = false;
        $orGroupSql .= " RS_Name LIKE ?";
        $params[] = "%$word%";
    }
    $orGroupSql .= ")";
    $firstOrGroup = false;
}

// 處理 targetWords
if (!empty($targetWords)) {
    if (!$firstOrGroup) {
        $orGroupSql .= " OR ";
    }
    $firstInner = true;
    $orGroupSql .= "(";
    foreach ($targetWords as $word) {
        if (!$firstInner) {
            $orGroupSql .= " OR ";
        }
        $firstInner = false;
        $orGroupSql .= " OB_Name LIKE ?";
        $params[] = "%$word%";
    }
    $orGroupSql .= ")";
    $firstOrGroup = false;
}

// 處理 learnClassWords
if (!empty($learnClassWords)) {
    if (!$firstOrGroup) {
        $orGroupSql .= " OR ";
    }
    $firstInner = true;
    $orGroupSql .= "(";
    foreach ($learnClassWords as $word) {
        if (!$firstInner) {
            $orGroupSql .= " OR ";
        }
        $firstInner = false;
        $orGroupSql .= " CS_Name LIKE ?";
        $params[] = "%$word%";
    }
    $orGroupSql .= ")";
    $firstOrGroup = false;
}

// 處理 deviceTypeWords
if (!empty($deviceTypeWords)) {
    if (!$firstOrGroup) {
        $orGroupSql .= " OR ";
    }
    $firstInner = true;
    $orGroupSql .= "(";
    foreach ($deviceTypeWords as $word) {
        if (!$firstInner) {
            $orGroupSql .= " OR ";
        }
        $firstInner = false;
        $orGroupSql .= " CR_Name LIKE ?";
        $params[] = "%$word%";
    }
    $orGroupSql .= ")";
    $firstOrGroup = false;
}

// 將 OR 組合加到主查詢中
if (!empty($orGroupSql)) {
    $mainSql .= " AND (" . $orGroupSql . ")";
}

// 處理 searchWords
if (!empty($searchWords)) {
    $first = true;
    foreach ($searchWords as $word) {
        foreach ($searchTextQueryColumns as $column) {
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
}

$sql = $cteSql . " " . $mainSql;
// @error_log($sql . PHP_EOL, 3, __DIR__ . '/debug.log');
// @error_log(print_r($bodyData, true) . PHP_EOL, 3, __DIR__ . '/debug.log');
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

$resourceNumber = array();
while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $json_array[] = $data;
}
echo json_encode($json_array[0][""], JSON_PRETTY_PRINT);
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>

