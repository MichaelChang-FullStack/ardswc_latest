

 <?php
    // 包含 PHPMailer 的主類文件
    require '../phpmailer/src/PHPMailer.php';
    require '../phpmailer/src/SMTP.php';
    require '../phpmailer/src/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    header('Content-Type: application/json ; charset=utf-8');

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

        // SMTP 設置
        $smtp_config = [
            "smtpServer" => "smtp.gmail.com",
            "port" => 587,
            "username" => "a77471@gmail.com",
            "password" => "ywyuwdfdeebxkbmv",
            "senderEmail" => "a77471@gmail.com",
            "senderName" => "農村水保署",
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
            $mail->setFrom($smtp_config['senderEmail'], $smtp_config['senderName']);
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            // 循环发送给多个收件人
            foreach ($emailList as $recipientEmail) {
                $mail->clearAddresses();
                $mail->addAddress($recipientEmail);
                
            switch ($templateName) {
                case 'outdoor_classroom_application':
                    $id = $bodyData['id'] ?? '';
                    $currentDateTime = date('Y/m/d H:i');
                        $visitDateTime = $bodyData['visitDateTime'] ?? '';
                        $formattedVisitDateTime = formatDateTime($visitDateTime);                        
                        $outdoorClassroom = $bodyData['outdoorClassroom'] ?? '';    
                        $name = $bodyData['name'] ?? '';
                        $groupName = $bodyData['groupName'] ?? '';
                        $phone = $bodyData['phone'] ?? '';
                        $address = $bodyData['address'] ?? '';
                        $remark = $bodyData['remark'] ?? '';
                        $notice = $bodyData['notice'] ?? '';
                        $MNo = $bodyData['MNo'] ?? '';
                        $number = $bodyData['number'] ?? '';
    
                        $subject = "[農村水保署水保酷學堂－戶外教室系統] 已收到申請通知：【{$formattedVisitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
    
                        $body = "<!DOCTYPE html>
                        <html lang=\"zh-Hant\">
                        <head>
                            <meta charset=\"UTF-8\">
                            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                            <style>
                            .section { margin-bottom: 20px; }
                            .section h2 { font-size: 18px; margin-bottom: 10px; }
                            .section p { margin: 5px 0; }
                            .title { text-align: center; font-weight: bold; font-size: larger; }
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                            .container { background-color: #fff; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            th, td { padding: 10px; text-align: left; border: 1px solid #ccc; }
                            th { font-weight: bold; width: 20%; }
                            .highlight { font-weight: bold; color: red; }
                            .status-button { background-color: #808080; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px; }
                        </style>
                        </head>
                        <body>
                            <div class=\"container\">
                                <h2>農村水保署－戶外教室申請單（{$id}）</h2>
                                <table>
                                    <tr>
                                        <td colspan=\"2\" class=\"title\">申請單通知</td>
                                    </tr>
                                    <tr>
                                        <td colspan=\"2\">
                                            親愛的 $name 您好：<br>
                                            <span class=\"highlight\">已收到您的申請資訊</span>，
                                            感謝您申請水土保持戶外教室（及教學園區）之參訪！本通知函僅為通知您本系統已收到您的申請訊息，並供您再次核對之用，不代表申請已核定。
                                        </td>
                                    </tr>
                                </table>
                                <table class=\"info-table\">
                                    <tr>
                                        <td colspan=\"2\" class=\"title\">戶外教室申請單資訊</td>
                                    </tr>
                                    <tr>
                                        <th>申請單編號</th>
                                        <td>$id</td>
                                    </tr>
                                    <tr>
                                        <th>申請日期</th>
                                        <td>$currentDateTime</td>
                                    </tr>
                                    <tr>
                                        <th>申請明細</th>
                                        <td>
                                            <div class=\"section\">
                                                <p>戶外教室: {$outdoorClassroom}</p>
                                                <p>團體名稱: {$groupName}</p>
                                                <p>聯絡人: {$name}</p>
                                                <p>聯絡電話: {$phone}</p>
                                                <p>聯絡地址: {$address}</p>
                                                <p>電子信箱: {$email}</p>
                                                <p>參觀日期: {$formattedVisitDateTime}</p>
                                                <p>報名人數: {$number}</p>
                                                <p>備註: {$remark}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>申請狀態</th>
                                        <td class=\"status-cell\">
                                            <button class=\"status-button\">審核中</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>審核作業時間</th>
                                        <td>將在最短的時間內處理您的申請，也為避免浪費行政資源，若未確實填寫聯絡人、電話與相關基本資訊，造成須補件與延誤參訪日期，請申請人自行負責。</td>
                                    </tr>
                                    <tr>
                                        <th>申請狀態查詢</th>
                                        <td>請至「<a href=\"#\">水保酷學堂 - 會員專區 - 戶外教室參訪</a>」查詢申請單處理情形。</td>
                                    </tr>
                                    <tr>
                                        <th>其他</th>
                                        <td>請注意，您申請的戶外教室若逾期未到訪或於三天前臨時取消累積兩次者，將取消線上預約參訪資格。</td>
                                    </tr>
                                </table>
                                <p class=\"highlight\">※此信件為系統發出信件，請勿直接回覆。</p>
                            </div>
                        </body>
                        </html>
                        ";
                    break;
        
                case 'approval_notification':
                    $id = $bodyData['id'] ?? '';
                    $visitDateTime = $bodyData['visitDateTime'] ?? '';
                    $formattedVisitDateTime = formatDateTime($visitDateTime);   
                    $outdoorClassroom = $bodyData['outdoorClassroom'] ?? '';                    
                    $name=$bodyData['name'] ?? '';
                    $groupName=$bodyData['groupName'] ?? '';
                    $phone=$bodyData['phone'] ?? '';
                    $address=$bodyData['address'] ?? '';
                    $applicantsNumber=$bodyData['applicantsNumber'] ?? '';
                    $remark=$bodyData['remark'] ?? '';
                    $notice=$bodyData['notice'] ?? '';
                    $classAddress=$bodyData['classAddress'] ?? '';
                    $classUrl=$bodyData['classUrl'] ?? '';
                    $MNo=$bodyData['MNo'] ?? '';        
                    $district=$bodyData['district'] ?? '';
                    $county=$bodyData['county'] ?? '';
                    $number=$bodyData['number'] ?? '';
                    $age=$bodyData['age'] ?? '';
                    $purpose=$bodyData['purpose'] ?? '';
                    $tour=$bodyData['tour'] ?? '';                    
                    $subject = "[農村水保署水保酷學堂－戶外教室系統] 預約成功：【{$visitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                            
                    $body = "<!DOCTYPE html>
                    <html lang=\"zh-Hant\">
                    <head>
                    <meta charset=\"UTF-8\">
                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                    <title>戶外教室申請</title>
                    <style>
                    .container { font-family: 'Noto Sans CJK TC'; font-size: 16px; line-height: 24px; letter-spacing: 0.16em; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
                    h1 { text-align: center; font-size: 24px; margin-bottom: 20px; font-weight: 700; }
                    .section { margin-bottom: 30px; }
                    .warning { color: red; font-weight: bold; }
                    p { margin-bottom: 30px; font-size: 16px; }
                    hr { margin-bottom: 15px; }
                    .value { color: rgba(108, 117, 125, 1); }
                    .title { margin-right: 15px; font-weight: bold; min-width: 80px; font-size: 16px; display: inline-block; width: 70px; }
                    .status-button { background-color: #467d1e; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px; display: inline-block; }
                    </style>
                    </head>
                    <body>
                    <div class=\"container\">
                    <h1>戶外教室申請</h1>
                    <div class=\"section\">
                    <p><span class=\"title\">戶外教室</span><span class=\"value\">{$outdoorClassroom}</span></p>
                    <p><span class=\"title\">團體名稱</span><span class=\"value\">{$groupName}</span></p>
                    <p><span class=\"title\">報名人數</span><span class=\"value\">{$number}</span></p>
                    <p><span class=\"title\">年齡分佈</span><span class=\"value\">{$age}</span></p>
                    <p><span class=\"title\">參訪目的</span><span class=\"value\">{$purpose}</span></p>
                    <p><span class=\"title\">是否導覽</span><span class=\"value\">{$tour}</span></p>
                    <p><span class=\"title\">聯絡人</span><span class=\"value\">{$name}</span></p>
                    <p><span class=\"title\">聯絡電話</span><span class=\"value\">{$phone}</span></p>
                    <p><span class=\"title\">聯絡地址</span><span class=\"value\">{$address}</span></p>
                    <p><span class=\"title\">電子信箱</span><span class=\"value\">{$email}</span></p>
                    <p><span class=\"title\">參觀日期</span><span class=\"value\">{$formattedVisitDateTime}</span></p>
                    <p><span class=\"title\">備註</span><span class=\"value\">{$remark}</span></p>
                    </div>
                    <hr>
                    <div class=\"section\">
                    <span class=\"title\">申請結果</span><button class=\"status-button\">預約成功</button>
                    </div>
                    {$notice}
                    <p class=\"warning\">※如需取消預約請致電聯繫窗口！</p>
                    </div>
                    </body>
                    </html>";
                    break;

                case 'denied_notification':
                    $id = $bodyData['id'] ?? '';
                    $visitDateTime = $bodyData['visitDateTime'] ?? '';
                    $formattedVisitDateTime = formatDateTime($visitDateTime);   
                    $outdoorClassroom = $bodyData['outdoorClassroom'] ?? '';                    
                    $name=$bodyData['name'] ?? '';
                    $groupName=$bodyData['groupName'] ?? '';
                    $phone=$bodyData['phone'] ?? '';
                    $address=$bodyData['address'] ?? '';
                    $applicantsNumber=$bodyData['applicantsNumber'] ?? '';
                    $remark=$bodyData['remark'] ?? '';
                    $notice=$bodyData['notice'] ?? '';
                    $classAddress=$bodyData['classAddress'] ?? '';
                    $classUrl=$bodyData['classUrl'] ?? '';
                    $MNo=$bodyData['MNo'] ?? '';        
                    $district=$bodyData['district'] ?? '';
                    $county=$bodyData['county'] ?? '';
                    $number=$bodyData['number'] ?? '';
                    $age=$bodyData['age'] ?? '';
                    $purpose=$bodyData['purpose'] ?? '';
                    $tour=$bodyData['tour'] ?? '';      
        
                    $subject = "[農村水保署水保酷學堂－戶外教室系統] 婉拒申請：【{$visitDateTime}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                    $body = "<!DOCTYPE html>
                    <html lang=\"zh-Hant\">
                    <head>
                    <meta charset=\"UTF-8\">
                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                    <title>戶外教室申請</title>
                    <style>
                    .container { font-family: 'Noto Sans CJK TC'; font-size: 16px; line-height: 24px; letter-spacing: 0.16em; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
                    h1 { text-align: center; font-size: 24px; margin-bottom: 20px; font-weight: 700; }
                    .section { margin-bottom: 30px; }
                    .warning { color: red; font-weight: bold; }
                    p { margin-bottom: 30px; font-size: 16px; }
                    hr { margin-bottom: 15px; }
                    .value { color: rgba(108, 117, 125, 1); }
                    .title { margin-right: 15px; font-weight: bold; min-width: 80px; font-size: 16px; display: inline-block; width: 70px; }
                    .status-button { background-color: red; color: white; border: none; border-radius: 25px; padding: 5px 15px; font-size: 14px; display: inline-block; }
                    </style>
                    </head>
                    <body>
                    <div class=\"container\">
                    <h1>戶外教室申請</h1>
                    <div class=\"section\">
                    <p><span class=\"title\">戶外教室</span><span class=\"value\">{$outdoorClassroom}</span></p>
                    <p><span class=\"title\">團體名稱</span><span class=\"value\">{$groupName}</span></p>
                    <p><span class=\"title\">報名人數</span><span class=\"value\">{$number}</span></p>
                    <p><span class=\"title\">年齡分佈</span><span class=\"value\">{$age}</span></p>
                    <p><span class=\"title\">參訪目的</span><span class=\"value\">{$purpose}</span></p>
                    <p><span class=\"title\">是否導覽</span><span class=\"value\">{$tour}</span></p>
                    <p><span class=\"title\">聯絡人</span><span class=\"value\">{$name}</span></p>
                    <p><span class=\"title\">聯絡電話</span><span class=\"value\">{$phone}</span></p>
                    <p><span class=\"title\">聯絡地址</span><span class=\"value\">{$address}</span></p>
                    <p><span class=\"title\">電子信箱</span><span class=\"value\">{$email}</span></p>
                    <p><span class=\"title\">參觀日期</span><span class=\"value\">{$formattedVisitDateTime}</span></p>
                    <p><span class=\"title\">備註</span><span class=\"value\">{$remark}</span></p>
                    </div>
                    <hr>
                    <div class=\"section\">
                    <span class=\"title\">申請結果</span><button class=\"status-button\">婉拒申請</button>
                    </div>
                    {$notice}
                    </div>
                    </body>
                    </html>";
                    break;
                case 'review_notification':
                    $name=$bodyData['name'] ?? '';
                    $outdoorClassroom = $bodyData['outdoorClassroom'] ?? '';  
                    $id = $bodyData['id'] ?? '';

                $subject = "[農村水保署水保酷學堂－戶外教室系統] 參訪申請待審核通知：會員【{$name}】參訪【{$outdoorClassroom}】戶外教室申請單（{$id}）";
                
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
        
                default:
                    $subject = "Default Subject";
                    $body = "<html><body><p>這是預設模板的內容。</p></body></html>";
                    break;
            }

            // 設置郵件內容
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = strip_tags($body);

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



    function formatDateTime($originalDateTime) {
        // 创建 DateTime 对象
        $datetime = new DateTime($originalDateTime);
        
        // 将日期格式化为所需的格式
        return $datetime->format('Y/m/d H:i');
    }