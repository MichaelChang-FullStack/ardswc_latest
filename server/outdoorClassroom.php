<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 确保数据库连接正常
if ($conn === false) {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Database connection failed: ' . print_r(sqlsrv_errors(), true)
  ));
  exit;
}

// 确保连接的数据库是 class
$useDatabaseQuery = "USE class";
$useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);

if ($useDatabaseStmt === false) {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)
  ));
  exit;
}


// 获取 POST 数据并处理
$serial_id = generateRandomCode($conn);

$class_name = isset($_POST['outdoor_classroom']) ? htmlspecialchars($_POST['outdoor_classroom']) : '';
$group_name = isset($_POST['Group_name']) ? htmlspecialchars($_POST['Group_name']) : '';
$number = isset($_POST['Number']) ? (int)$_POST['Number'] : 0;  // 确保是整数
$phone = isset($_POST['Phone']) ? htmlspecialchars($_POST['Phone']) : '';
$postal_code = isset($_POST['postCode']) ? (int)$_POST['postCode'] : null;  // 可选的整数
$address = isset($_POST['Address']) ? htmlspecialchars($_POST['Address']) : '';
$email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
$name = isset($_POST['Name']) ? htmlspecialchars($_POST['Name']) : '';
$visit_time = isset($_POST['Visit_Time']) ? htmlspecialchars($_POST['Visit_Time']) : '';
$remark = isset($_POST['Remark']) ? htmlspecialchars($_POST['Remark']) : '';

$age = isset($_POST['age']) ? (int)$_POST['age'] : 0;  // 确保是整数
$purpose = isset($_POST['Purpose']) ? htmlspecialchars($_POST['Purpose']) : '';
$tour = isset($_POST['Tour']) ? (int)$_POST['Tour'] : 0;  // 确保是整数
$gender = isset($_POST['gender']) ? (int)$_POST['gender'] : 0;  // 确保是整数
$privacyPolicy = isset($_POST['privacyPolicy']) ? htmlspecialchars($_POST['privacyPolicy']) : '';

$ipAddress = $_SERVER['REMOTE_ADDR'];
$appli_time = date('Y-m-d H:i:s') . '.' . sprintf("%03d", round(microtime(true) * 1000) % 1000);

$status_id = 1;  // StatusId
$status_name = '待審核';  // StatusName
$separation = 5;  // Separation
$separation_name = '金冠教師會員';  // Separation_Name

// 构建 SQL 查询
$query = "
    INSERT INTO dbo.ClassReserve (
        Serial_Id, 
        Class_Name, 
        Group_name, 
        Number, 
        Age, 
        Purpose, 
        Tour, 
        Name, 
        Phone, 
        Gender, 
        Address, 
        PostalCode, 
        Email, 
        Visit_Time, 
        Remark, 
        Appli_Time, 
        StatusId, 
        StatusName, 
        Separation, 
        Separation_Name
    ) 
    VALUES (
        ?,   -- Serial_Id
        ?,   -- Class_Name
        ?,   -- Group_name
        ?,   -- Number
        ?,   -- Age
        ?,   -- Purpose
        ?,   -- Tour
        ?,   -- Name
        ?,   -- Phone
        ?,   -- Gender
        ?,   -- Address
        ?,   -- PostalCode
        ?,   -- Email
        ?,   -- Visit_Time
        ?,   -- Remark
        ?,   -- Appli_Time
        ?,   -- StatusId
        ?,   -- StatusName
        ?,   -- Separation
        ?    -- Separation_Name
    )
";

// 参数数组
$params = array(
  $serial_id,      // Serial_Id
  $class_name,     // Class_Name
  $group_name,     // Group_name
  $number,         // Number
  $age,            // Age
  $purpose,        // Purpose
  $tour,           // Tour
  $name,           // Name
  $phone,          // Phone
  $gender,         // Gender
  $address,        // Address
  $postal_code,    // PostalCode
  $email,          // Email
  $visit_time,     // Visit_Time
  $remark,         // Remark
  $appli_time,     // Appli_Time
  $status_id,      // StatusId
  $status_name,    // StatusName
  $separation,     // Separation
  $separation_name // Separation_Name
);

$stmt = sqlsrv_prepare($conn, $query, $params);
if ($stmt === false) {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true)
  ));
  exit;
}

// 执行 SQL 查询
if (sqlsrv_execute($stmt)) {
  echo json_encode(array(
    'status' => 'true',
    'message' => 'Data inserted successfully'
  ));
} else {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Failed to insert data: ' . print_r(sqlsrv_errors(), true)
  ));
}

/**
 * 生成新的代码
 *
 * @param resource $conn 数据库连接
 * @return string 生成的代码
 * @throws Exception 如果序列号超出范围或查询失败
 */
function generateCode($conn)
{
  try {
    // 获取当前日期
    $currentDate = new DateTime();
    $datePart = $currentDate->format('Ymd'); // 获取年月日部分

    // 获取最新的序列号
    $latestSequence = getLatestSequenceNumber($conn, $datePart);

    // 生成新的序列号
    $newSequence = $latestSequence + 1;

    // 检查序列号是否超过上限
    if ($newSequence > 999) {
      throw new Exception('當日編號已達上限');
    }

    // 格式化序列号并返回完整的代码
    return sprintf('%s%03d', $datePart, $newSequence);
  } catch (Exception $e) {
    // 输出异常信息和堆栈跟踪
    error_log('Error in generateCode: ' . $e->getMessage());
    throw $e; // 重新抛出异常
  }
}

/**
 * 获取指定日期的最新序列号
 *
 * @param resource $conn 数据库连接
 * @param string $datePart 日期部分 (YYYYMMDD)
 * @return int 最新的序列号
 * @throws Exception 如果查询失败
 */
function getLatestSequenceNumber($conn, $datePart)
{
  try {
    // SQL 查询最新的序列号
    $sql = "
        SELECT TOP 1 RIGHT(Serial_Id, 3) AS LastSequence
        FROM dbo.ClassReserve
        WHERE LEFT(Serial_Id, 8) = ?
          AND ISDEL = 0
        ORDER BY Serial_Id DESC
    ";

    // 输出 SQL 查询和参数
    error_log("Executing query: $sql");
    error_log("With parameter: $datePart");

    // 执行 SQL 查询
    $params = array($datePart);
    $stmt = sqlsrv_query($conn, $sql, $params);

    // 检查查询是否成功
    if ($stmt === false) {
      $error = sqlsrv_errors();
      error_log('SQL query failed: ' . print_r($error, true));
      throw new Exception('查询失败: ' . print_r($error, true));
    }

    // 获取查询结果
    $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    // 返回最新的序列号，如果没有结果则返回 0
    return $result ? intval($result['LastSequence']) : 0;
  } catch (Exception $e) {
    // 输出异常信息和堆栈跟踪
    error_log('Error in getLatestSequenceNumber: ' . $e->getMessage());
    throw $e; // 重新抛出异常
  }
}

/**
 * 生成新的随机代码
 *
 * @return string 生成的随机代码
 */
function generateRandomCode()
{
  // 获取当前日期
  $currentDate = new DateTime();
  $datePart = $currentDate->format('Ymd'); // 获取年月日部分

  // 生成一个三位数的随机序列号
  $randomSequence = random_int(0, 999);

  // 格式化序列号并返回完整的代码
  return sprintf('%s%03d', $datePart, $randomSequence);
}

// 释放资源
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
