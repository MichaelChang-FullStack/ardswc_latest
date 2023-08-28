<?php
$serverName = 'localhost\\SQLEXPRESS';
$database = 'Learn_ardswc_new';
$uid = 'Learn_swcb';
$pwd = 'Swcb2022Learn';

$connectionOptions = array(
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pwd,
    "CharacterSet" => "UTF-8"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

?>