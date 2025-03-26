<?php
include("config.php");
include("queryFunctions.php");
header('Content-Type: application/json ; charset=utf-8');

$bodyData = handleJsonInput();

$pageSize = 10;
$pageNumber = isset($bodyData['pageNumber']) ? max(1, (int) $bodyData['pageNumber']) : 1;

$queryText = $bodyData['queryText'] ?? '';
$searchWords = !empty(trim($queryText)) ? explode(' ', $queryText) : array();

$filters = [
    'resourceTypeWords' => array_unique(getWordsFromData('resourceTypeNames', $bodyData)),
    'topicWords' => array_unique(getWordsFromData('topicNames', $bodyData)),
    'resourceCategoryWords' => array_unique(getWordsFromData('resourceCategoryNames', $bodyData)),
    'targetWords' => array_unique(getWordsFromData('targetNames', $bodyData)),
    'learnClassWords' => array_unique(getWordsFromData('learnClassNames', $bodyData)),
    'deviceTypeWords' => array_unique(getWordsFromData('deviceTypeNames', $bodyData)),
];

$totalResourcesCount = getFilteredResourcesCount($conn, $filters);

$searchTextQueryColumns = ['Title', 'ShortDescrip', 'BookKeyword', 'BookID', 'BC_Name', 'IS_Name', 'BookDirectoryData', 'TC_Name'];
$resourceTypeColumns = ['BT_Name', 'TC_Name', 'EC_Name', 'FC_Name', 'JC_Name', 'BC_Name', 'BookDirectoryData'];

$isPushed = 'pushed' === ($bodyData['isPush'] ?? '') ? " AND isPush = 1 " : '';

$params = [];

$cteSql = "WITH RankedData AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY BookID ORDER BY BookID ASC) AS rn, ";
$cteSql .= !empty($searchWords) ? buildRelevanceScore($searchTextQueryColumns, $searchWords, $params) . " AS RelevanceScore " : "0 AS RelevanceScore ";
$cteSql .= "FROM dbo.VW_TA_BOOKS WHERE IsOnline = 1 $isPushed )";

$mainSql = "SELECT BookID, Title, ShortDescrip, BC_Name, TC_Name, FC_Name, OB_Name, RS_Name, TP_Name, BT_Name, IM_FILE, CoverFileName, ONDate as orderDate, RelevanceScore
    FROM RankedData WHERE rn = 1";

if (!empty($filters['resourceTypeWords'])) {
    $mainSql .= " AND " . buildLikeClause($resourceTypeColumns, $filters['resourceTypeWords'], $params);
}

$otherConditions = [
    'topicWords' => 'TP_Name',
    'resourceCategoryWords' => 'RS_Name',
    'targetWords' => 'OB_Name',
    'learnClassWords' => 'CS_Name',
    'deviceTypeWords' => 'CR_Name',
];

foreach ($otherConditions as $key => $column) {
    if (!empty($filters[$key])) {
        $mainSql .= " AND " . buildLikeClause([$column], $filters[$key], $params);
    }
}

$mainSql .= " ORDER BY RelevanceScore DESC, ONDate DESC OFFSET " . (($pageNumber - 1) * $pageSize) . " ROWS FETCH NEXT " . $pageSize . " ROWS ONLY";

$sql = $cteSql . " " . $mainSql;

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

$json_array = [];
while ($data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $json_array[] = $data;
}

$json_output = [
    'totalResources' => $totalResourcesCount,
    'data' => $json_array
];

echo json_encode($json_output, JSON_PRETTY_PRINT);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
