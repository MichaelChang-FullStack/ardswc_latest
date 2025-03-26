<?php
$serverName = 'localhost\\SQLEXPRESS';
$database = 'Learn_swcb_new';
$uid = 'Learn_swcb';
function decryptData($data, $encryptionKey) {
    $decodedData = base64_decode($data);
    $iv = substr($decodedData, 0, 16);
    $encryptedData = substr($decodedData, 16);
    return openssl_decrypt($encryptedData, 'aes-256-cbc', $encryptionKey, 0, $iv);
}
$encryptionKey = 'ardswc';
$encryptedData=getenv('DB_PASSWORD');
$pwd = decryptData($encryptedData, $encryptionKey);
$connectionOptions = array(
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pwd,
    "CharacterSet" => "UTF-8"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

?>
