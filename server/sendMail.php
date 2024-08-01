<?php
// 包含 PHPMailer 的主類文件
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';
require '../phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 獲取表單數據
    // $smtpServer = $_POST['smtpServer'];
    // $port = $_POST['port'];
    // $username = $_POST['username'];
    // $password = $_POST['password'];
    // $senderEmail = $_POST['senderEmail'];
    // $email = $_POST['email'];
    // $subject = $_POST['subject'];
    // $message = $_POST['message'];

    $smtpServer = 'smtp.gmail.com'; // 修改为你的 SMTP 伺服器地址
    $port = 465; // 修改为你的 SMTP 端口
    $username = 'a77471@gmail.com'; // 修改为你的郵件賬號
    $password = 'ywyuwdfdeebxkbmv'; // 修改为你的郵件密碼
    $senderEmail = 'a77471@gmail.com'; // 修改为发件人邮箱
    $email = 'a77471@gmail.com';
    $subject = '主題';
    $message = '內容';

    // 創建 PHPMailer 實例
    $mail = new PHPMailer(true);

    try {
        // 設置郵件伺服器配置
        $mail->isSMTP();
        $mail->Host = $smtpServer; // 你的 SMTP 伺服器地址
        $mail->SMTPAuth = true;
        $mail->Username = $username;; // 你的郵件賬號
        $mail->Password = $password; // 你的郵件密碼
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $port;

        // 啟用日誌
        // $mail->SMTPDebug = 0; 
        // $mail->Debugoutput = 'html';

        // 設置收件人和發件人信息
        $mail->setFrom($senderEmail);
        $mail->addAddress($email);

        // 設置郵件內容
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = strip_tags($message);

        // 設定字符集和編碼
        $mail->CharSet = 'UTF-8';                            // 設定字符集
        $mail->Encoding = 'base64';                          // 設定編碼方式

        // 發送郵件
        if ($mail->send()) {
            header('Content-Type: application/json');
            echo json_encode(['message' => '郵件已成功發送！']);
        } else {
            throw new Exception('郵件無法發送。錯誤: ' . $mail->ErrorInfo);
        }
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['message' => '郵件無法發送！' . $e->getMessage()]);
    }
} else {
    // 如果不是POST請求，重定向回表單頁面
    header("Location: ../pages/smtp.html");
    exit();
}
