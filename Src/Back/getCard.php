<?php
header("Access-Control-Allow-Origin: *");
session_start();

require_once("functions.php");
$pdo = getConnection();

$cardId = $_GET["cardId"];

$sql = "select * from Card where id_card=:cardId";
$query = $pdo->prepare($sql);
$query->bindValue (':cardId', $cardId);
$ret = $query->execute();
$row = $query->fetch();

$result = array(
"code" => "",
"content" => "");

if ($row == false) {
    $result["code"] = 500;
    $result["content"] = "Error while retrieving a card";
    echo json_encode($result);
    exit(1);
}

$result["code"] = 200;
$result["content"] = array(
"id_card" => $row["id_card"],
"description" => $row["description"],
"title" => $row["title"],
"date" => $row["date"],
"priority" => $row["priority"]
);

echo json_encode($result);