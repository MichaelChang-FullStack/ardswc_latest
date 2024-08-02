<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailSender
{
    private $smtp_config;

    public function __construct($smtp_config)
    {
        $this->smtp_config = $smtp_config;
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
            $mail->setFrom($this->smtp_config['senderEmail']);
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
            error_log("郵件發送失敗: {$mail->ErrorInfo}");
            return "郵件發送失敗: {$mail->ErrorInfo}";
        }
    }
}
