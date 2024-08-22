<?php
$servername = "172.16.58.28";
$username = "learning";
$password = "7F751bf7b96049b49c517B38c94C3557";
$dbname = "femaDB";

// 建立連接
$conn = new mysqli($servername, $username, $password, $dbname);

// 檢查連接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => '解析 JSON 数据时发生错误: ' . json_last_error_msg()]);
    exit;
}

// 確認所需參數是否存在
if (!isset($bodyData['cellphone']) || !isset($bodyData['Name'])) {
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$cellphone = $bodyData['cellphone'];
$Name = $bodyData['Name'];
$content = "[農村水保署水保酷學堂－戶外教室系統] 
預約申請【帶入參訪日期時間】參訪【帶入申請之戶外教室】
已接到您的預約申請單：單號20240110170644 可至水保酷學堂>會員專區>戶外教室參訪查詢申請審核狀態。";

// 使用參數替換硬編碼的值
$sql = "INSERT INTO [femadb].[dbo].[tblSmsWorkList] 
        (payTime, cellphone, [Name], [status], content, [send], schedular, sendTYPE)
        VALUES (GETDATE(), ?, ?, -2, ?, 0, GETDATE(), 3001)";

$params = array($cellphone, $Name, $content);

// 使用 sqlsrv_query 執行插入操作
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
} else {
    echo "New record created successfully";
}

// 關閉連接
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
