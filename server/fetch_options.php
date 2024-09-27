<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 取得 POST 資料
$input = json_decode(file_get_contents('php://input'), true);
$search = isset($input['search']) ? $input['search'] : '';

// SQL 查詢來匹配搜尋條件並只撈取 Title
$sql = "SELECT Title
        FROM [Learn_swcb_new].[dbo].[TA_BOOKS]
        WHERE Title LIKE ?";
$params = array("%$search%");
$stmt = sqlsrv_query($conn, $sql, $params);

// 檢查 SQL 執行是否發生錯誤
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => '資料庫查詢錯誤: ' . print_r(sqlsrv_errors(), true)]);
    exit;
}

$results = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $results[] = [
        'lease_name' => $row['Title'],
    ];
}

// 根據查詢結果返回資料
if (!empty($results)) {
    $response = ['success' => true, 'message' => '資料已存在', 'data' => $results];
} else {
    $response = ['success' => false, 'message' => '未找到符合條件的資料'];
}

echo json_encode($response);

// 釋放資源
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
