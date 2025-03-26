<?php
function getWordsFromData($name, $bodyData) {
    $names = isset($bodyData[$name]) ? $bodyData[$name] : '';
    return !empty(trim($names)) ? explode(',', $names) : array();
}

function handleJsonInput() {
    $jsonData = file_get_contents('php://input');
    $bodyData = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 資料時發生錯誤: ' . json_last_error_msg());
    }
    return $bodyData;
}

function buildLikeClause($resourceTypeColumn, $resourceTypeWords, &$params) {
    $clauses = [];
    foreach ($resourceTypeColumn as $col) {
        $mainSql = [];
        foreach ($resourceTypeWords as $word) {
            $mainSql[] = "$col LIKE ?";
            $params[] = "%$word%";
        }
        $clauses[] = "(" . implode(" OR ", $mainSql) . ")";
    }
    return "(" . implode(" OR ", $clauses) . ")";
}

function buildRelevanceScore($searchTextQueryColumns, $searchWords, &$params) {
    $cteSql = "(";
    foreach ($searchWords as $word) {
        foreach ($searchTextQueryColumns as $column) {
            $cteSql .= "CASE WHEN $column LIKE ? THEN ";
            switch ($column) {
                case 'Title': $cteSql .= "10 "; break;
                case 'ShortDescrip': $cteSql .= "8 "; break;
                case 'BookKeyword': $cteSql .= "6 "; break;
                case 'BookID':
                case 'BC_Name':
                case 'IS_Name': $cteSql .= "4 "; break;
                case 'BookDirectoryData':
                case 'TC_Name': $cteSql .= "2 "; break;
            }
            $cteSql .= "ELSE 0 END + ";
            $params[] = "%$word%";
        }
    }
    return rtrim($cteSql, " + ") . ")";
}

function getFilteredResourcesCount($conn, $filters) {
  $params = [];
  $baseSql = "SELECT COUNT(*) AS TotalResources FROM dbo.VW_TA_BOOKS WHERE IsOnline = 1";

  if (!empty($filters['resourceTypeWords'])) {
      $baseSql .= " AND " . buildLikeClause(['BT_Name', 'TC_Name', 'EC_Name', 'FC_Name', 'JC_Name', 'BC_Name', 'BookDirectoryData'], $filters['resourceTypeWords'], $params);
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
          $baseSql .= " AND " . buildLikeClause([$column], $filters[$key], $params);
      }
  }

  $stmt = sqlsrv_query($conn, $baseSql, $params);
  if ($stmt === false) {
      die(print_r(sqlsrv_errors(), true));
  }

  $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
  sqlsrv_free_stmt($stmt);

  return $result['TotalResources'] ?? 0;
}

?>
