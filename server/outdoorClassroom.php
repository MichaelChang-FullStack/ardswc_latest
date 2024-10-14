<?php
include("config.php");
header('Content-Type: application/json; charset=utf-8');

// 开启错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
$method = isset($_POST['method']) ? $_POST['method'] : '';
$serial_id = isset($_POST['Serial_Id']) ? $_POST['Serial_Id'] : generateRandomCode();
$class_name = isset($_POST['outdoor_classroom']) ? htmlspecialchars($_POST['outdoor_classroom']) : '';
$group_name = isset($_POST['Group_name']) ? htmlspecialchars($_POST['Group_name']) : '';
$number = isset($_POST['Number']) ? (int)$_POST['Number'] : 0;
$phone = isset($_POST['Phone']) ? htmlspecialchars($_POST['Phone']) : '';
$postal_code = isset($_POST['postCode']) ? (int)$_POST['postCode'] : null;
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
$class_Address = isset($_POST['class_Address']) ? htmlspecialchars($_POST['class_Address']) : '';
$class_Url = isset($_POST['class_Url']) ? htmlspecialchars($_POST['class_Url']) : '';
$ipAddress = $_SERVER['REMOTE_ADDR'];
$appli_time = date('Y-m-d H:i:s') . '.' . sprintf("%03d", round(microtime(true) * 1000) % 1000);
$status_id = 1;
$status_name = '待審核';
$separation = 1;
$separation_name = '一般會員';
$MNo = isset($_POST['MNo']) ? htmlspecialchars($_POST['MNo']) : '';
$classID = isset($_POST['classID']) ? htmlspecialchars($_POST['classID']) : '';
$notice='';

if ($method === 'update') {
 
  $selectQuery = "SELECT * FROM dbo.ClassReserve as a
  left join dbo.ClassData as b on a.ClassID = b.ClassID
  WHERE Serial_Id = ?
  ";
  $selectParams = array($serial_id);
  $selectStmt = sqlsrv_query($conn, $selectQuery, $selectParams);

  if ($selectStmt === false) {
    echo json_encode(array(
      'status' => 'false',
      'message' => 'Failed to execute select query: ' . print_r(sqlsrv_errors(), true)
    ));
    exit;
  }

  // 获取 isEdit 值
  $isEdit = null;
  if ($row = sqlsrv_fetch_array($selectStmt, SQLSRV_FETCH_ASSOC)) {
    $isEdit = $row['isEdit'];
    $Contact= $row['Contact'];
    $Tel= $row['Tel'];
    $EMail= $row['EMail'];
  }

  $notice = "您好，我們已經收到您的戶外教室【{$class_name}】修改的參訪預約申請單，最晚將於【申請預約後的5日內】審核完畢，請耐心等候。
  
{$Contact}
{$Tel}
{$EMail}";

  
  // 根据 isEdit 的值决定是否执行 UPDATE
  if ($isEdit !== 1) {
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
        District = ?,
        Moder_Notice=?
      WHERE Serial_Id = ?
    ";
    $params = array(
      $class_name, $group_name, $number, $age, $purpose, $tour, $name, $phone, $gender,
      $address, $postal_code, $email, $formattedVisitTime, $remark, $appli_time,
      $status_id, $status_name, $separation, $separation_name, $county, $district,$notice, $serial_id
    );

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
        'message' => 'Data updated successfully',
        'id' => $serial_id
      ));
    } else {
      echo json_encode(array(
        'status' => 'false',
        'message' => 'Failed to update data: ' . print_r(sqlsrv_errors(), true)
      ));
    }
  } else {
    echo json_encode(array(
      'status' => 'false',
      'message' => '受審中'
    ));
  }

  // 释放资源
  sqlsrv_free_stmt($selectStmt);
}

if ($method === 'insert') {
  $notice = "您好，我們已經收到您的戶外教室【{$class_name}】參訪預約申請單，最晚將於【申請預約後的5日內】審核完畢，請耐心等候。";

  $query = "
    INSERT INTO dbo.ClassReserve (
      Serial_Id, 
      Name, 
      Class_Name, 
      Group_name, 
      Visit_Time, 
      Gender, 
      Number, 
      Age, 
      Purpose, 
      Tour, 
      Phone, 
      Address, 
      PostalCode, 
      Email, 
      Remark, 
      Appli_Time, 
      StatusId, 
      StatusName, 
      Separation, 
      Separation_Name,
      MNo,
      County,
      District,
      Class_Address,
      Class_Url,
      ClassID,
      Moder_Notice
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
  ";
  $params = array(
    $serial_id, $name, $class_name, $group_name, $formattedVisitTime, $gender, $number,
    $age, $purpose, $tour, $phone, $address, $postal_code, $email, $remark, $appli_time,
    $status_id, $status_name, $separation, $separation_name, $MNo, $county, $district,
    $class_Address, $class_Url,$classID,$notice
  );

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
      'message' => 'Data inserted successfully',
      'id' => $serial_id
    ));
  } else {
    echo json_encode(array(
      'status' => 'false',
      'message' => 'Failed to insert data: ' . print_r(sqlsrv_errors(), true)
    ));
  }

  // 释放资源
  sqlsrv_free_stmt($stmt);
}

if ($method === 'select') {
  $query = "SELECT * FROM dbo.ClassReserve where Serial_Id = ?";
  $params = array($serial_id);

  $stmt = sqlsrv_prepare($conn, $query, $params);
  if ($stmt === false) {
      echo json_encode(array(
          'status' => 'false',
          'message' => 'Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true)
      ));
      exit;
  }

  if (sqlsrv_execute($stmt)) {
      // 创建一个数组来存储查询结果
      $result = array();
      while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
          $result[] = $row;  // 将每行数据添加到结果数组中
      }

      if (count($result) > 0) {
          echo json_encode(array(
              'status' => 'true',
              'message' => 'Data query successfully',
              'data' => $result // 返回查询结果
          ));
      } else {
          echo json_encode(array(
              'status' => 'true',
              'message' => 'No data found',
              'data' => array() // 如果没有找到数据，返回空数组
          ));
      }
  } else {
      echo json_encode(array(
          'status' => 'false',
          'message' => 'Failed to query data: ' . print_r(sqlsrv_errors(), true)
      ));
  }

  // 释放资源
  sqlsrv_free_stmt($stmt);
}

// 关闭数据库连接
sqlsrv_close($conn);

// 生成新的随机代码
function generateRandomCode()
{
  $currentDate = new DateTime();
  $datePart = $currentDate->format('Ymd');
  $randomSequence = random_int(0, 999);

  return sprintf('%s%03d', $datePart, $randomSequence);
}

?>

