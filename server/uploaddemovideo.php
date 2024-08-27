<?php
// 設定檔案上傳目錄
$target_dir = "E:/swcb_110/files/Videos/";

$response = array('success' => false, 'message' => '', 'filename' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 檢查是否有檔案上傳
    if (isset($_FILES['videoFile']) && $_FILES['videoFile']['error'] === UPLOAD_ERR_OK) {
        $videoFile = $_FILES['videoFile'];
        $originalFileName = basename($videoFile['name']);
        $target_file = $target_dir . $originalFileName;
        $videoFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // 檢查是否已存在相同名稱且相同附檔名的影片
        if (file_exists($target_file)) {
            $response['filename'] = $originalFileName;
            $response['message'] = "檔案已存在，無法上傳相同名稱和附檔名的影片。";
        } else {
            // 移動上傳檔案到目標目錄
            if (move_uploaded_file($videoFile["tmp_name"], $target_file)) {
                $response['success'] = true;
                $response['filename'] = $originalFileName;
                $response['message'] = "檔案上傳成功。";
            } else {
                $response['message'] = "無法移動上傳的檔案。";
            }
        }
    } else {
        $response['message'] = "沒有檔案被上傳，或檔案上傳失敗。";
    }
} else {
    $response['message'] = "無效的請求方式。";
}

// 將結果返回給前端
header('Content-Type: application/json');
echo json_encode($response);
?>
