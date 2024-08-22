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
$method = isset($_POST['method']);
$serial_id = isset($_POST['Serial_Id']) ? $_POST['Serial_Id'] : generateRandomCode();

$class_name = isset($_POST['outdoor_classroom']) ? htmlspecialchars($_POST['outdoor_classroom']) : '';
$group_name = isset($_POST['Group_name']) ? htmlspecialchars($_POST['Group_name']) : '';
$number = isset($_POST['Number']) ? (int)$_POST['Number'] : 0;  // 确保是整数
$phone = isset($_POST['Phone']) ? htmlspecialchars($_POST['Phone']) : '';
$postal_code = isset($_POST['postCode']) ? (int)$_POST['postCode'] : null;  // 可选的整数
$address = isset($_POST['Address']) ? htmlspecialchars($_POST['Address']) : '';

$county = isset($_POST['County']) ? htmlspecialchars($_POST['County']) : '';
$district = isset($_POST['District']) ? htmlspecialchars($_POST['District']) : '';

$email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
$name = isset($_POST['Name']) ? htmlspecialchars($_POST['Name']) : '';
$visit_time = isset($_POST['Visit_Time']) ? htmlspecialchars($_POST['Visit_Time']) : '';
$formattedVisitTime = date('Y-m-d H:i:s', strtotime($visit_time));

$remark = isset($_POST['Remark']) ? htmlspecialchars($_POST['Remark']) : '';


$age = isset($_POST['age']) ? htmlspecialchars($_POST['age']) : '';
$purpose = isset($_POST['Purpose']) ? htmlspecialchars($_POST['Purpose']) : '';
$tour = isset($_POST['Tour']) ? htmlspecialchars($_POST['Tour']) : '';
$gender = isset($_POST['gender']) ? htmlspecialchars($_POST['gender']) : '';

$privacyPolicy = isset($_POST['privacyPolicy']) ? htmlspecialchars($_POST['privacyPolicy']) : '';

$ipAddress = $_SERVER['REMOTE_ADDR'];
$appli_time = date('Y-m-d H:i:s') . '.' . sprintf("%03d", round(microtime(true) * 1000) % 1000);

$status_id = 1;  // StatusId
$status_name = '待審核';  // StatusName
$separation = 1;  // Separation
$separation_name = '一般會員';  // Separation_Name
$MNo = isset($_POST['MNo']) ? htmlspecialchars($_POST['MNo']) : '';

// 使用 switch 语句来根据 method 参数控制操作
switch ($method) {
  case 'update':
    $query = "
      UPDATE dbo.ClassReserve
      SET
        Class_Name = ?, 
        Group_name = ?, 
        Number = ?, 
        Age = ?, 
        Purpose = ?, 
        Tour = ?, 
        Name = ?, 
        Phone = ?, 
        Gender = ?, 
        Address = ?, 
        PostalCode = ?, 
        Email = ?, 
        Visit_Time = ?, 
        Remark = ?, 
        Appli_Time = ?, 
        StatusId = ?, 
        StatusName = ?, 
        Separation = ?, 
        Separation_Name = ?,
        County = ?,
        District = ?
      WHERE Serial_Id = ?
    ";
    $params = array(
      $class_name, $group_name, $number, $age, $purpose, $tour, $name, $phone, $gender,
      $address, $postal_code, $email, $formattedVisitTime, $remark, $appli_time,
      $status_id, $status_name, $separation, $separation_name, $county, $district, $serial_id
    );
    break;

  case 'insert':
  default:
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
        Separation_Name,
        MNo,
        County,
        District
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $params = array(
      $serial_id, $class_name, $group_name, $number, $age, $purpose, $tour, $name,
      $phone, $gender, $address, $postal_code, $email, $formattedVisitTime, $remark,
      $appli_time, $status_id, $status_name, $separation, $separation_name, $MNo,
      $county, $district
    );
    break;
}

// 预处理和执行 SQL 查询
$stmt = sqlsrv_prepare($conn, $query, $params);
if ($stmt === false) {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true)
  ));
  exit;
}

if (sqlsrv_execute($stmt)) {
  echo json_encode(array(
    'status' => 'true',
    'message' => 'Data processed successfully',
    'id' => $serial_id
  ));
} else {
  echo json_encode(array(
    'status' => 'false',
    'message' => 'Failed to process data: ' . print_r(sqlsrv_errors(), true)
  ));
}

// 释放资源
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

// 生成新的随机代码
function generateRandomCode()
{
  $currentDate = new DateTime();
  $datePart = $currentDate->format('Ymd');
  $randomSequence = random_int(0, 999);

  return sprintf('%s%03d', $datePart, $randomSequence);
}