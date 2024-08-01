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

// 插入資料的SQL語法
$sql = "INSERT INTO [femadb].[dbo].[tblSmsWorkList] (payTime, cellphone, [Name], [status], content, [send], schedular, sendTYPE)
        VALUES (GETDATE(), '0911_757974', '許家祥', -2, 'test', 0, GETDATE(), 3001)";

// 執行插入操作
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 關閉連接
$conn->close();
