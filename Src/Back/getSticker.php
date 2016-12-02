<?php
header("Access-Control-Allow-Origin: *");
session_start();

require_once("functions.php");
$pdo = getConnection();

$sticker_id = $_GET["stickerId"];

$sql = "SELECT * FROM Sticker where id_sticker=:sticker_id";
$query = $pdo->prepare($sql);
$query->bindValue (':sticker_id', $sticker_id);

$ret = $query->execute();
$row = $query->fetch();

$result = array(
"code" => "",
"content" => "");

if ($row == false) {
    $result["code"] = 500;
    $result["content"] = "Error while retrieving sticker";
    echo json_encode($result);
    exit(1);
}

$result["code"] = 200;
$result["content"] = array(
"id_sticker" => $row["id_sticker"],
"title" => $row["title"],
"logo" => $row["logo"],
"description" => $row["description"],
"cond" => $row["cond"]
);

echo json_encode($result);