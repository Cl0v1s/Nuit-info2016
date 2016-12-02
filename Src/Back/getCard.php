<?php
session_start();

require_once("functions.php");
$pdo = getConnection();

$cardId = $_POST["startId"];

$sql = "select * from Card where id=:cardId";
$query = $pdo->prepare($sql);
$query->bindValue (':cardId', $cardId);

$row = $query->query()->fetch();

$result = array(
"code" => "",
"content" => "");

if (empty($row)) {
    $result["code"] = 500;
    $result["content"] = "Error while retrieving a card";
    echo json_encode($result);
    exit(1);
}

$result["code"] = 200;
$result["content"] = array(
"id_card" => $row->id_card,
"description" => $row->description,
"title" => $row->title,
"date" => $row->date,
"priority" => $row->priority
);

echo json_encode($result);