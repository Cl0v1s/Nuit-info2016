<?php 
session_start();
session_destroy();

$result = array(
    "code" => "200",
    "content" => "Ok");

echo json_encode($result);