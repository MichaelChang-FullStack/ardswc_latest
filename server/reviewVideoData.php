<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 設定檔案目錄
$target_dir = "E:/swcb_110/files/Videos/";

$response = array('success' => false, 'message' => '', 'data' => []);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 從POST請求中获取传递的 MNo 参数
    $bodyData = json_decode(file_get_contents('php://input'), true);
    $MId = $bodyData['mno'] ?? null;

    if (!$MId) {
        echo json_encode(['success' => false, 'message' => '缺少必要的參數']);
        exit;
    }

    // 查询数据库中 MId 对应的所有 State 为 "待審核" 的记录
    $sql_query = "SELECT VideoID, VideoName, State FROM [Learn_swcb_new].[dbo].[TA_MEMBERUPLOAD_DATA] WHERE MId = ? AND State = '待審核' AND ISDEL = 0 ORDER BY CreatedDate DESC";
    $stmt_query = sqlsrv_prepare($conn, $sql_query, array($MId));

    if ($stmt_query === false || !sqlsrv_execute($stmt_query)) {
        error_log(print_r(sqlsrv_errors(), true));
        echo json_encode(['success' => false, 'message' => '查詢失敗']);
        exit;
    }

    $results = [];
    while ($row = sqlsrv_fetch_array($stmt_query, SQLSRV_FETCH_ASSOC)) {
        $video_url = '/files/Videos/' . basename($row['VideoID']); // 生成影片的URL路徑

        $results[] = [
            'video_url' => $video_url, // 影片的URL
            'title' => $row['VideoName'], // 使用VideoID去除副檔名後作為項目名稱
            'button' => $row['State'] // 狀態
        ];
    }

    if (empty($results)) {
        echo json_encode(['success' => false, 'message' => '找不到待審核的資料']);
    } else {
        echo json_encode(['success' => true, 'data' => $results]);
    }

    sqlsrv_close($conn);
    exit;
}
?>
