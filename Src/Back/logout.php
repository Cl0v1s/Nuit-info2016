<?php 
header("Access-Control-Allow-Origin: *");
session_start();
session_destroy();

$result = array(
    "code" => "200",
    "content" => "Ok");

echo json_encode($result);