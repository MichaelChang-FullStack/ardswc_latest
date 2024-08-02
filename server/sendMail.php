

 <?php
// 包含 PHPMailer 的主類文件
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';
require '../phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //獲取表單數據
    $smtpServer = $_POST['smtpServer'];
    $port = $_POST['port'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $senderEmail = $_POST['senderEmail'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // SMTP 設置
    $smtp_config = [
        "smtpServer" => "smtp.gmail.com",
        "port" => 587,
        "username" => "a77471@gmail.com",
        "password" => "ywyuwdfdeebxkbmv",
        "senderEmail" => "a77471@gmail.com",
        "senderName" => "農村水保署",
        "sendTo" => "a77471@gmail.com",
    ];

    // 創建 PHPMailer 實例
    $mail = new PHPMailer(true);

    try {
        // 設置郵件伺服器配置
        $mail->isSMTP();
        $mail->Host = $smtp_config['smtpServer']; 
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_config['username']; 
        $mail->Password = $smtp_config['password']; 
        $mail->Port = $smtp_config['port'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // 設置收件人和發件人信息
        $mail->setFrom($smtp_config['senderEmail']);
        $mail->addAddress($smtp_config['sendTo']);

        // 設定字符集和編碼
        $mail->CharSet = 'UTF-8';                           
        $mail->Encoding = 'base64';                          

        // 準備郵件數據
        $emailData = [
            'applicantName' => '張三',
            'visitDateTime' => '2024年1月15日 10:00',
            'outdoorClassroom' => '某某戶外教室',
            'applicationNumber' => '20240110170644',
            'applicationDate' => '2024/01/10 17:06',
        ];

        // 生成郵件主題
        $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：{$emailData['visitDateTime']}參訪{$emailData['outdoorClassroom']}戶外教室申請單（{$emailData['applicationNumber']}）";

        // 生成郵件內容
        $body = generateEmailTemplate('outdoor_classroom_application', $emailData);

        // 設置郵件內容
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($message);

        // 啟用日誌
        // $mail->SMTPDebug = 0; 
        // $mail->Debugoutput = 'html';

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

function generateEmailTemplate($templateName, $data)
{
    // 這裡可以根據不同的模板名稱返回不同的HTML內容
    switch ($templateName) {
        case 'outdoor_classroom_application':
            return "
            <html>
            <body>
                <h2>申請單通知：</h2>
                <p>親愛的 {$data['applicantName']} 您好：</p>
                <p>已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。</p>
                <!-- 其餘內容 -->
            </body>
            </html>
            ";
            // 可以添加更多的模板案例
        default:
            return "";
    }
}

// <?php
// require 'server\emailSender.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {

//     // 獲取表單數據
//     // $smtpServer = $_POST['smtpServer'];
//     // $port = $_POST['port'];
//     // $username = $_POST['username'];
//     // $password = $_POST['password'];
//     // $senderEmail = $_POST['senderEmail'];
//     // $email = $_POST['email'];
//     // $subject = $_POST['subject'];
//     // $message = $_POST['message'];


//     // SMTP 設置
//     $smtp_config = [
//         "smtpServer" => "smtp.gmail.com",
//         "port" => 587,
//         "username" => "a77471@gmail.com",
//         "password" => "ywyuwdfdeebxkbmv",
//         "senderEmail" => "a77471@gmail.com",
//         "senderName" => "農村水保署",
//     ];

//     // 創建 EmailSender 實例
//     $emailSender = new EmailSender($smtp_config);

//     // 準備郵件數據
//     $emailData = [
//         'applicantName' => '張三',
//         'visitDateTime' => '2024年1月15日 10:00',
//         'outdoorClassroom' => '某某戶外教室',
//         'applicationNumber' => '20240110170644',
//         'applicationDate' => '2024/01/10 17:06',
//     ];

//     // 生成郵件主題
//     $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：{$emailData['visitDateTime']}參訪{$emailData['outdoorClassroom']}戶外教室申請單（{$emailData['applicationNumber']}）";

//     // 生成郵件內容
//     $body = generateEmailTemplate('outdoor_classroom_application', $emailData);

//     // 發送郵件
//     $result = $emailSender->sendEmail($smtp_config['senderEmail'], $subject, $body);

//     if ($result==true) {
//         echo "郵件發送成功";
//     } else {
//         echo "郵件發送失敗";
//     }
// }


