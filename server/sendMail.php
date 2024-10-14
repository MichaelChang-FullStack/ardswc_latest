

 <?php
    // 包含 PHPMailer 的主類文件
    require '../phpmailer/src/PHPMailer.php';
    require '../phpmailer/src/SMTP.php';
    require '../phpmailer/src/Exception.php';
    require 'email_template.php';
    include("config.php");
    $config = include("config_env.php");
    $outdoor_classroom_url = $config['outdoor_classroom_url'];
    $admin_url = $config['admin_url'];
    
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
        $email = $emailList[0] ?? null;
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

                if (!is_array($emailList)) {
                    error_log("emailList is not an array, cannot process.");
                    return false;
                }

                foreach ($emailList as $recipientEmail) {

                    $mail->clearAddresses();
                    $mail->addAddress($recipientEmail);

                    $emailContent = generateEmailContent($templateName, $email);
                    // error_log(print_r($emailContent, true));

                    $mail->isHTML(true);
                    $mail->Subject = $emailContent['subject'];
                    $mail->Body = $emailContent['body'];
                    $mail->AltBody = strip_tags($emailContent['body']);

                    // 發送郵件
                    if (!$mail->send()) {
                        throw new Exception('郵件無法發送。錯誤: ' . $mail->ErrorInfo);
                    }
                }

                header('Content-Type: application/json');
                echo json_encode(['message' => '郵件已成功發送！']);
            
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

    function generateEmailContent($templateName, $email) {
        
        global $bodyData, $conn, $classTemplate , $outdoor_classroom_url, $admin_url;

        $id = $bodyData['id'] ?? '';
        $subject = $bodyData['subject'] ?? '';
        $message = $bodyData['message'] ?? '';
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
            $County = $classReserveData['County'] ?? '';
            $District = $classReserveData['District'] ?? '';
            $address = $classReserveData['Address'] ?? '';
            $visitDateTime = $classReserveData['Visit_Time'] ?? '';
            $formattedVisitDateTime = $visitDateTime->format('Y-m-d H:i:s');
            $number = $classReserveData['Number'] ?? '';
            $remark = $classReserveData['Remark'] ?? '';
            $notice = $classReserveData['Moder_Notice'] ?? '';

            $variables = [
                '{{id}}' => $id,
                '{{name}}' => $name,
                '{{currentDateTime}}' => $currentDateTime,
                '{{outdoorClassroom}}' => $outdoorClassroom,
                '{{groupName}}' => $groupName,
                '{{phone}}' => $phone,
                '{{address}}' => $County.$District.$address,
                '{{email}}' => $email,
                '{{formattedVisitDateTime}}' => $formattedVisitDateTime,
                '{{number}}' => $number,
                '{{remark}}' => $remark,
                '{{message}}' => $message,
                '{{url}}' => $outdoor_classroom_url
            ];           
        } 

        switch ($templateName) {
            case 'test':
                $subject = "test";
                $body = "test";  
                break;

            case 'outdoor_classroom_application':

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "已收到您的申請資訊，感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('審核中');
                $body = strtr($classTemplate, $variables);     
                break;
    
            case 'approval_notification':
                
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 申請審核通過通知：您預約的【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室參訪已通過（{$id}）";
                $message = "您好，您的戶外教室【{$outdoorClassroom}】參訪預約申請單已審核通過，期待您的光臨。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('預約成功');
                $body = strtr($classTemplate, $variables);      
                break;

            case 'denied_notification':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 申請審核未通過通知：您預約的【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室參訪未通過（{$id}）";
                $message = $notice;
                $variables['{{message}}'] = $message;
                $variables['{{button}}']= generateButton('未通過');
                $body = strtr($classTemplate, $variables);
                break;

            case 'outdoor_classroom_update':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到修改申請通知：您已修改【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "您好，我們已經收到您的戶外教室【{$outdoorClassroom}】修改的參訪預約申請單，最晚將於【申請預約後的5日內】審核完畢，請耐心等候。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('審核中');      
                $body = strtr($classTemplate, $variables);     
                break;

            case 'outdoor_classroom_update_late':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到修改申請通知：您已修改【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "我們已經收到您的戶外教室【{$outdoorClassroom}】修改的參訪預約申請單，最晚將於【申請預約後的5日內】審核完畢，請耐心等候。請注意，由於修改日期或修改日已為活動日前10日，故該申請並不一定能被核准。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('審核中');               
                $body = strtr($classTemplate, $variables);     
                break;

            case 'outdoor_classroom_cancel':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到取消申請通知：您已取消【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                $message = "您好，我們已經收到您的取消【{$outdoorClassroom}】參訪預約申請，還是期待您下次的預約，祝福您順心。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('已取消');             
                $body = strtr($classTemplate, $variables);     
                break;

            case 'reminder_visit_date':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 參訪提醒：您預約的【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室參訪行程即將在2日內開始（{$id}）";
                $message = "您已預約於兩天後（【{$formattedVisitDateTime}】）參訪【{$outdoorClassroom}】，請準備好愉快的心情和學習的精神，準時抵達戶外教室！我們誠摯地期待您的到來。";
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('預約成功');             
                $body = strtr($classTemplate, $variables);     
                break;

            case 'disaster_setup':
                $subject = $subject;
                $message = $message;
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('已取消');               
                $body = strtr($classTemplate, $variables);     
                break;

            case 'maint_setup':
                $subject = $subject;
                $message = $message;
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('已取消');          
                $body = strtr($classTemplate, $variables);        
                break;

            case 'other_setup':
                $subject = $subject;
                $message = $message;
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('已取消');               
                $body = strtr($classTemplate, $variables);         
                break;

            case 'reg_setup':
                $subject = $subject;
                $message = $message;
                $variables['{{message}}'] = $message;
                $variables['{{button}}'] = generateButton('已取消');      
                $body = strtr($classTemplate, $variables);     
                break;

            case 'review_notification':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 參訪申請待審核通知：會員【{$name}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";                
                $body = "<body>            
                <p>戶外教室管理員您好：</p>                
                <p style=\"text-indent: 2em;\">
                系統已收到會員【{$name}】參訪【{$outdoorClassroom}】之預約申請單：單號{$id}。請至
                「<a href=\"{$admin_url}\">水保酷學堂後台 > 戶外教室管理 > 預約申請審核</a>」
                審核該筆預約；或點選以下網址：
                <a href=\"{$admin_url}\">{$admin_url}</a> 進行審核作業。
                </p>
                </body>";
                break;

            case 'notification_deadline':
                $subject = "[農村水保署水保酷學堂－戶外教室系統] 參訪申請待審核通知：會員【{$name}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";                
                $body = "<body>            
                <p>戶外教室管理員您好：</p>                
                <p style=\"text-indent: 2em;\">
                參訪申請待審核通知：會員【{$name}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）即將逾期，請儘速至後台完成審核作業！請至
                「<a href=\"{$admin_url}\">水保酷學堂後台 > 戶外教室管理 > 預約申請審核</a>」
                審核該筆預約；或點選以下網址：
                <a href=\"{$admin_url}\">{$admin_url}</a> 進行審核作業。
                </p>
                </body>";
                break;
                
            default:
                $subject = "預設模板";
                $body = "<html><body><p>這是預設模板的內容。</p></body></html>";
                break;
        }

        return ['subject' => $subject, 'body' => $body];
    }

    function generateButton($templateName) {
        switch ($templateName) {
            case '審核中':
                return '<button style="background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">審核中</button>';
    
            case '預約成功':
                return '<button style="background-color: #467d1e; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">預約成功</button>';
    
            case '未通過':
                return '<button style="background-color: red; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">未通過</button>';
    
            case '已取消':
                return '<button style="background-color: #e0e0e0; color: #757575; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px;">已取消</button>';
    
            default:
                return '';
        }
    }