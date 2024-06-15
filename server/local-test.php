<?php

class LocalTest{
    public static function fetch_resource($path){
        $jsonData = file_get_contents('php://input');
        $bodyData = json_decode($jsonData, true);
        
        $root = 'ardswc';
        $path = explode($root, $path)[1];
        $path = str_replace('\\', '/', $path);

        $url = 'https://learning.ardswc.gov.tw' . $path;

        // Set headers for the request
        $headers = array(
            'Content-Type: application/json'
        );

        // Prepare the JSON data to send
        $data = $bodyData;

        // Encode the data as JSON
        $jsonData = json_encode($data);

        // Initialize cURL session
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute the request
        $response = curl_exec($ch);

        // Close the cURL session
        curl_close($ch);

        return $response;
    }
}
?>