<?php
 include("config.php");
 header('Content-Type: application/json; charset=utf-8');
 if ($conn === false) {
   die(print_r(sqlsrv_errors(), true));
}

 $nickname = $_POST['nickname'];
 $gender = $_POST['gender'];
 $email = $_POST['email'];
 $contact_number = $_POST['contact_number'];
 $feedback = $_POST['feedback'];
$currentUrlInput=$_POST['currentUrlInput'];
 if($gender=='男性')
 {
   $gender_num=0;
 }
 else if($gender=='女性')
 {
   $gender_num=1;
 }
 else
 {
   $gender_num=0;
 }

 

$ipAddress = $_SERVER['REMOTE_ADDR'];



$currentTime = date('Y-m-d H:i:s') . '.' . sprintf("%03d", round(microtime(true) * 1000) % 1000);

 //$query = "INSERT INTO dbo.OPINION (NickName,Sex,Tel,Email,Feedback,NeedAck,FromIP ,SendTime,SourceName,RefPage,OpType,AckBy,AckTime,AckContent,AckStatus) VALUES(?,?,?,?,?,1,'?','?','?','?','OPINION',NULL,NULL,NULL,'未回覆')";


//$stmt = sqlsrv_prepare($conn, $query, array(&$nickname, &$gender_num, &$contact_number, &$email, &$feedback , &$ipAddress, &$currentTime, &$currentUrlInput, &$currentUrlInput));
$query = "INSERT INTO dbo.OPINION (NickName,Sex,Tel,Email,Feedback,NeedAck,FromIP,SendTime,SourceName,RefPage,OpType,AckBy,AckTime,AckContent,AckStatus) VALUES(?,?,?,?,?,1,?,?,?,?,'OPINION',NULL,NULL,NULL,'未回覆')";

$stmt = sqlsrv_prepare($conn, $query, array(&$nickname, &$gender_num, &$contact_number, &$email, &$feedback, &$ipAddress, &$currentTime, &$currentUrlInput, &$currentUrlInput));
if ($stmt === false) {
    $html = array(
        'status' => 'false',
        'message' => 'Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true)
    );
    echo json_encode($html);
    exit;
}


if (sqlsrv_execute($stmt)) {
    $html = array(
        'status' => 'true',
        'message' => 'Opinion added successfully'
    );
    echo json_encode($html);
} else {
    $html = array(
        'status' => 'false',
        'message' => 'Failed to add Opinion data: ' . print_r(sqlsrv_errors(), true)
    );
    echo json_encode($html);
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

 ?>