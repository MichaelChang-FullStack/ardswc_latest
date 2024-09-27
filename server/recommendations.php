<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 解析來自 POST 請求的 JSON 資料
$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => '解析 JSON 数据时发生错误: ' . json_last_error_msg()]);
    exit;
}

$mno = $bodyData['mno'] ?? null;

if (!$mno) {
    echo json_encode(['success' => false, 'message' => '缺少必要的參數 mno']);
    exit;
}

// SQL 查詢來檢查是否有符合條件的資料
$sql = "SELECT VideoID, LeaseName, State 
        FROM [Learn_swcb_new].[dbo].[TA_MEMBERUPLOAD_DATA] 
        WHERE MId = ? 
        AND ISDEL = 0 
        AND State <> '待審核'";

$params = array($mno);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => '資料庫查詢錯誤: ' . print_r(sqlsrv_errors(), true)]);
    exit;
}

$results = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $results[] = [
        'video_url' => '/files/Videos/' . basename($row['VideoID']),
        'createddate' => date('Y/m/d', ($row['CreatedDate'])), // 將 CreatedDate 轉換為 YYYY/MM/DD 格式
        'title' => $row['LeaseName'],
        'state' => $row['State']
    ];
}

// 根據查詢結果返回資料
if (!empty($results)) {
    $response = array("success" => true, "message" => "資料已存在", "data" => $results);
} else {
    $response = array("success" => false, "message" => "未找到符合條件的資料");
}

echo json_encode($response);

// 釋放資源
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
