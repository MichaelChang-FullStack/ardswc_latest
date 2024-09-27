<?php
$serverName = "172.16.58.28"; // 服务器名称或 IP 地址，例如 "localhost" 或 "192.168.1.100"
$connectionOptions = array(
    "Database" => "femaDB",  // 数据库名
    "Uid" => "learning",     // 用户名
    "PWD" => "7F751bf7b96049b49c517B38c94C3557",     // 密码
    "CharacterSet" => "UTF-8"     // 设置字符集，防止乱码
);

// 建立连接
$conn = sqlsrv_connect($serverName, $connectionOptions);

// 检查连接是否成功
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$jsonData = file_get_contents('php://input');
$bodyData = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => '解析 JSON 数据时发生错误: ' . json_last_error_msg()]);
    exit;
}

// 确认所需参数是否存在
if (!isset($bodyData['cellphone']) || !isset($bodyData['Name'])) {
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$cellphone = $bodyData['cellphone'];
$Name = $bodyData['Name'];
$content = $bodyData['content'];

// 使用参数替换硬编码的值
$sql = "INSERT INTO [femadb].[dbo].[tblSmsWorkList] 
        (payTime, cellphone, [Name], [status], content, [send], schedular, sendTYPE)
        VALUES (GETDATE(), ?, ?, -2, ?, 0, GETDATE(), 3001)";

$params = array($cellphone, $Name, $content);

// 使用 sqlsrv_query 执行插入操作
$stmt = sqlsrv_query($conn, $sql, $params);

header('Content-Type: application/json');
if ($stmt === false) {
    $response = array("status" => "error", "message" => sqlsrv_errors());
    echo json_encode($response);
} else {
    $response = array("status" => "success", "message" => "New record created successfully");
    echo json_encode($response);
}

// 关闭连接
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>