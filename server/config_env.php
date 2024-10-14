<?php
$environment = 'develope'; // 這裡可以設定 'develope' 或 'production' 來切換環境

// 根據環境選擇的配置
if ($environment === 'develope') {
    return [
        'base_url' => 'https://tarode.in/',
        'outdoor_classroom_url' => 'https://tarode.in/pages/user.html?page=outdoor-classroom-visits',
        'admin_url' => 'https://tarode.in/admin/login.php',
        'sendMail_url' => 'https://tarode.in/server/sendMail.php',
        'addNews_url' => 'https://tarode.in/server/userNews.php',
    ];
} else {
    return [
        'base_url' => 'https://learning.ardswc.gov.tw/',
        'outdoor_classroom_url' => 'https://learning.ardswc.gov.tw/pages/user.html?page=outdoor-classroom-visits',
        'admin_url' => 'https://learning.ardswc.gov.tw/admin/login.php',
        'sendMail_url' => 'https://learning.ardswc.gov.tw/server/sendMail.php',
        'addNews_url' => 'https://learning.ardswc.gov.tw/server/userNews.php',
    ];
}
