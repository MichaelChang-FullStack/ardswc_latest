

 <?php
    // 包含 PHPMailer 的主類文件
    require '../phpmailer/src/PHPMailer.php';
    require '../phpmailer/src/SMTP.php';
    require '../phpmailer/src/Exception.php';
    require 'email_template.php';
    include("config.php");
    header('Content-Type: application/json; charset=utf-8');
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    checkDatabaseConnection($conn);

    $jsonData = file_get_contents('php://input');    
    $bodyData = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('解析 JSON 發生錯誤: ' . json_last_error_msg());
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $emailList = $bodyData['email'] ?? [];        
        $email = '';
        if (count($emailList) == 1) {
            $email = $emailList[0];
        }
        $templateName = $bodyData['templateName'] ?? '';        

        $smtp_config = [
            "smtpServer" => "smtp.gmail.com",
            "port" => 587,
            "username" => "a77471@gmail.com",
            "password" => "ywyuwdfdeebxkbmv",
            "senderEmail" => "a77471@gmail.com",
            "senderName" => "農村水保署",
        ];

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = $smtp_config['smtpServer'];
            $mail->SMTPAuth = true;
            $mail->Username = $smtp_config['username'];
            $mail->Password = $smtp_config['password'];
            $mail->Port = $smtp_config['port'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

            // 設置收件人和發件人信息
            $mail->setFrom($smtp_config['senderEmail'], $smtp_config['senderName']);
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            // 循环发送给多个收件人
            foreach ($emailList as $recipientEmail) {
                $mail->clearAddresses();
                $mail->addAddress($recipientEmail);
            
            $emailContent = generateEmailContent($templateName, $bodyData, $conn, $classTemplate, $email);

            $mail->isHTML(true);
            $mail->Subject = $emailContent['subject'];
            $mail->Body = $emailContent['body'];
            $mail->AltBody = strip_tags($emailContent['body']);

            // 發送郵件
            if ($mail->send()) {
                header('Content-Type: application/json');
                echo json_encode(['message' => '郵件已成功發送！']);
            } else {
                throw new Exception('郵件無法發送。錯誤: ' . $mail->ErrorInfo);
            }
            }
            
        } catch (Exception $e) {
            
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(['message' => '郵件無法發送！' . $e->getMessage()]);
        }
    } else {
        // 如果不是POST請求，重定向回表單頁面
        exit();
    }

    function checkDatabaseConnection($conn) {
        if ($conn === false) {
            echo json_encode([
                'status' => 'false',
                'message' => 'Database connection failed: ' . print_r(sqlsrv_errors(), true)
            ]);
            exit;
        }
    
        $useDatabaseQuery = "USE class";
        $useDatabaseStmt = sqlsrv_query($conn, $useDatabaseQuery);
    
        if ($useDatabaseStmt === false) {
            echo json_encode([
                'status' => 'false',
                'message' => 'Failed to switch database: ' . print_r(sqlsrv_errors(), true)
            ]);
            exit;
        }
    }
    
    // 函数：执行查询，获取 ClassReserve 数据
    function fetchClassReserveData($conn, $id) {
        $query = "SELECT * FROM dbo.ClassReserve WHERE Serial_Id = ?";
        $params = array($id);
        $stmt = sqlsrv_prepare($conn, $query, $params);
    
        if ($stmt === false) {
            exit('Failed to prepare the statement: ' . print_r(sqlsrv_errors(), true));
        }
    
        if (sqlsrv_execute($stmt)) {
            $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
            return $row ? $row : null;
        } else {
            exit('Failed to execute query: ' . print_r(sqlsrv_errors(), true));
        }
    }

    function generateEmailContent($templateName, $bodyData, $conn, $classTemplate, $email) {
        $id = $bodyData['id'] ?? '';
        $currentDateTime = date('Y/m/d H:i');

        $row = null;
        if ($id) {
            $classReserveData = fetchClassReserveData($conn, $id);
        }

        if ($classReserveData) {
        $name = $classReserveData['Name'] ?? '';
        $outdoorClassroom = $classReserveData['Class_Name'] ?? '';
        $groupName = $classReserveData['Group_name'] ?? '';
        $phone = $classReserveData['Phone'] ?? '';
        $address = $classReserveData['Address'] ?? '';
        $visitDateTime = $classReserveData['Visit_Time'] ?? '';
        $formattedVisitDateTime = $visitDateTime->format('Y-m-d H:i:s');
        $number = $classReserveData['Number'] ?? '';
        $remark = $classReserveData['Remark'] ?? '';
        $notice = $classReserveData['Moder_Notice'] ?? '';
        } 

        switch ($templateName) {
            case 'test':
                $body = "test";  
                break;

            case 'outdoor_classroom_application':

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                $button ='<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
                $variables = [
                    '{{id}}' => $id,
                    '{{name}}' => $name,
                    '{{currentDateTime}}' => $currentDateTime,
                    '{{outdoorClassroom}}' => $outdoorClassroom,
                    '{{groupName}}' => $groupName,
                    '{{phone}}' => $phone,
                    '{{address}}' => $address,
                    '{{email}}' => $email,
                    '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                    '{{number}}' => $number,
                    '{{remark}}' => $remark,
                    '{{message}}' => $message,
                    '{{button}}' => $button,
                ];                
                $body = strtr($classTemplate, $variables);     
                break;
    
            case 'approval_notification':
                
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 申請審核通過通知：您預約的【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室參訪已通過（【{$id}】）";
                $message = "您好，您的戶外教室【{$outdoorClassroom}】參訪預約申請單已審核通過，期待您的光臨。";
                $button ='<button  style="background-color: #467d1e; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">預約成功</button>';
                $variables = [
                    '{{id}}' => $id,
                    '{{name}}' => $name,
                    '{{currentDateTime}}' => $currentDateTime,
                    '{{outdoorClassroom}}' => $outdoorClassroom,
                    '{{groupName}}' => $groupName,
                    '{{phone}}' => $phone,
                    '{{address}}' => $address,
                    '{{email}}' => $email,
                    '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                    '{{number}}' => $number,
                    '{{remark}}' => $remark,
                    '{{message}}' => $message,
                    '{{button}}' => $button,
                ];
                $body = strtr($classTemplate, $variables);      
                break;

            case 'denied_notification':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 申請審核未通過通知：您預約的【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室參訪未通過（【{$id}】）";
                $message = $notice;
                $button ='<button  style="background-color: red; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">未通過</button>';
                $variables = [
                    '{{id}}' => $id,
                    '{{name}}' => $name,
                    '{{currentDateTime}}' => $currentDateTime,
                    '{{outdoorClassroom}}' => $outdoorClassroom,
                    '{{groupName}}' => $groupName,
                    '{{phone}}' => $phone,
                    '{{address}}' => $address,
                    '{{email}}' => $email,
                    '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                    '{{number}}' => $number,
                    '{{remark}}' => $remark,
                    '{{message}}' => $message,
                    '{{button}}' => $button,
                ];
                $body = strtr($classTemplate, $variables);
                break;

            case 'review_notification':
                $name=$bodyData['name'] ?? '';
                $outdoorClassroom = $bodyData['outdoorClassroom'] ?? '';  
                $id = $bodyData['id'] ?? '';

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 參訪申請待審核通知：會員【{$name}】參訪【{$outdoorClassroom}】戶外教室申請單（【{$id}】）";
                
                $body = "<body>
            
                <p>戶外教室管理員您好：</p>
                
                <p style=\"text-indent: 2em;\">
                    系統已收到會員【{$name}】參訪【{$outdoorClassroom}】之預約申請單：單號{$id}。請至
                    「<a href=\"https://tarode.in/admin/login.php\">水保酷學堂後台 > 戶外教室管理 > 預約申請審核</a>」
                    審核該筆預約；或點選以下網址：
                        <a href=\"https://tarode.in/admin/login.php\">https://tarode.in/admin/login.php</a> 進行審核作業。
                    </p>
                </body>";
                break;

            case 'outdoor_classroom_update':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到取消申請通知：您已取消【變數：戶外教室預約日期/時間】參訪【變數：戶外教室名稱】戶外教室申請單（【變數：會員ID】）";
                $body = "<html><body><p>這是預設模板的內容。</p></body></html>";
                break;
            case 'disaster_setup':

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                $button ='<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
                $variables = [
                    '{{id}}' => $id,
                    '{{name}}' => $name,
                    '{{currentDateTime}}' => $currentDateTime,
                    '{{outdoorClassroom}}' => $outdoorClassroom,
                    '{{groupName}}' => $groupName,
                    '{{phone}}' => $phone,
                    '{{address}}' => $address,
                    '{{email}}' => $email,
                    '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                    '{{number}}' => $number,
                    '{{remark}}' => $remark,
                    '{{message}}' => $message,
                    '{{button}}' => $button,
                ];                
                $body = strtr($classTemplate, $variables);     
                break;
            case 'maint_setup':

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                $button ='<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
                $variables = [
                    '{{id}}' => $id,
                    '{{name}}' => $name,
                    '{{currentDateTime}}' => $currentDateTime,
                    '{{outdoorClassroom}}' => $outdoorClassroom,
                    '{{groupName}}' => $groupName,
                    '{{phone}}' => $phone,
                    '{{address}}' => $address,
                    '{{email}}' => $email,
                    '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                    '{{number}}' => $number,
                    '{{remark}}' => $remark,
                    '{{message}}' => $message,
                    '{{button}}' => $button,
                ];                
                $body = strtr($classTemplate, $variables);     
                break;

            case 'other_setup':

                    $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                    $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                    $button ='<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
                    $variables = [
                        '{{id}}' => $id,
                        '{{name}}' => $name,
                        '{{currentDateTime}}' => $currentDateTime,
                        '{{outdoorClassroom}}' => $outdoorClassroom,
                        '{{groupName}}' => $groupName,
                        '{{phone}}' => $phone,
                        '{{address}}' => $address,
                        '{{email}}' => $email,
                        '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                        '{{number}}' => $number,
                        '{{remark}}' => $remark,
                        '{{message}}' => $message,
                        '{{button}}' => $button,
                    ];                
                    $body = strtr($classTemplate, $variables);     
                    break;

            case 'reg_setup':
    
                    $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                    $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                    $button ='<button class="status-button" style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
                    $variables = [
                        '{{id}}' => $id,
                        '{{name}}' => $name,
                        '{{currentDateTime}}' => $currentDateTime,
                        '{{outdoorClassroom}}' => $outdoorClassroom,
                        '{{groupName}}' => $groupName,
                        '{{phone}}' => $phone,
                        '{{address}}' => $address,
                        '{{email}}' => $email,
                        '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                        '{{number}}' => $number,
                        '{{remark}}' => $remark,
                        '{{message}}' => $message,
                        '{{button}}' => $button,
                    ];                
                    $body = strtr($classTemplate, $variables);     
                    break;
                
            default:
                $subject = "Default Subject";
                $body = "<html><body><p>這是預設模板的內容。</p></body></html>";
                break;
        }

        return ['subject' => $subject, 'body' => $body];
    }

    