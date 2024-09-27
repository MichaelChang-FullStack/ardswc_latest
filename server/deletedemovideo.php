<?php
// 設定檔案目錄
$target_dir = "E:/swcb_110/files/Videos/";

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 從請求中取得影片檔案名稱
    $data = json_decode(file_get_contents('php://input'), true);
    $filename = $data['filename'] ?? '';

    if (!empty($filename)) {
        $target_file = $target_dir . basename($filename);

        // 檢查檔案是否存在，然後刪除
        if (file_exists($target_file)) {
            if (unlink($target_file)) {
                $response['success'] = true;
                $response['message'] = '影片已成功刪除';
            } else {
                $response['message'] = '無法刪除影片檔案';
            }
        } else {
            $response['message'] = '影片檔案不存在';
        }
    } else {
        $response['message'] = '檔案名稱無效';
    }
} else {
    $response['message'] = '無效的請求方式';
}

// 將結果返回給前端
header('Content-Type: application/json');
echo json_encode($response);
?>
