<?php
require_once dirname(__DIR__) . '/phpmailer/src/PHPMailer.php';
require_once dirname(__DIR__) . '/phpmailer/src/SMTP.php';
require_once dirname(__DIR__) . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class EmailSender
{
    private $smtp_config;
    protected $table_title, $table_no, $table_info_title, $table_info_date, $table_info_content, $table_status, $table_notice, $table_link, $table_note;

    public function __construct()
    {
        $this->smtp_config = [
            "smtpServer" => "mail.ardswc.gov.tw",
            "port" => 25,
            "username" => "backzousteclear",
            "password" => "swcbeip1234!",
            "senderEmail" => "backzousteclear@ardswc.gov.tw",
            "senderName" => "農村水保署",
        ];
    }

    public function sendEmail($to, $subject, $body, $isHTML = true)
    {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = $this->smtp_config['smtpServer'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $this->smtp_config['username'];
            $mail->Password   = $this->smtp_config['password'];
            //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $this->smtp_config['port'];

            // Recipients
            $mail->setFrom($this->smtp_config['senderEmail'], $this->smtp_config['senderName']);
            $mail->addAddress($to);

            // Content
            $mail->isHTML($isHTML);
            $mail->Subject = $subject;
            $mail->Body    = $body;

            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("郵件發送失敗: {$mail->ErrorInfo}" . PHP_EOL, 3, __DIR__ . '/debug.log');
            return "郵件發送失敗: {$mail->ErrorInfo}";
        }
    }

    public function get_template()
    {
        return '
        <!DOCTYPE html>
        <html lang="zh-Hant">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
            <div class="container" style="background-color: #fff; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                ' . $this->get_header() . '
                ' . $this->get_main() . '
                ' . $this->get_footer() . '
                <p style="font-weight: bold; color: red;">※此信件為系統發出信件，請勿直接回覆。</p>
            </div>
        </body>
        </html>
        ';
    }

    protected function get_header()
    {
        return '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;border: 1px solid #ccc;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc;">申請單通知</td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                    ' . $this->table_title . '
                </td>
            </tr>
        </table>';
    }

    protected function get_main()
    {
        return '<table class="info-table" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px;border: 1px solid #ccc; font-weight: bold; width: 20%;">' . $this->table_info_title . '</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請單編號</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_no . '</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請日期</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_info_date . '</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請明細</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                    <div class="section" style="margin-bottom: 20px;">
                        ' . $this->table_info_content . '
                    </div>
                </td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請狀態</th>
                <td class="status-cell" style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                ' . $this->table_status . '
                </td>
            </tr>           
        </table>';
    }

    protected function get_footer()
    {
        return '<table class="" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc; font-weight: bold; width: 20%;">注意事項</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">審核作業時間</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_notice . '</td>
            </tr>
        
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請狀態查詢</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_link . '</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">其他</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_note . '</td>
            </tr>
        </table>';
    }
}
