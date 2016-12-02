<?php
session_start();

require_once("functions.php");
$pdo = getConnection();

$cardId = $_GET["id_card"];

$sql = "select * from Card where id_card=:cardId";
$query = $pdo->prepare($sql);
$query->bindValue (':cardId', $cardId);

//$query->execute(array('cardId'=>$cardId));
$query->execute();
$row=$query->fetch();
//$row = 
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
"id_card" => $row['id_card'],
"title" => $row["title"],
"description" => $row["description"],
"date" => $row["date"],
"priority" => $row["priority"],
"user_id" => $row["user_id"],
"value"=> $row["value"]
);

echo json_encode($result);