<?php 
session_start();

require_once("functions.php");
$pdo = getConnection();

$cardId = $_POST["cardId"];
$upVote = $_POST["upVote"];

if (!isset($_SESSION["login"])) {
    $result["code"] = 401;
    $result["content"] = "You're not logged in";
    echo json_encode($result);
    exit(1);
}

$idUser = $_SESSION["login"];

$sql = "update Card set value=value+:value where user_id=:user_id AND card_id=:card_id";
$query = $pdo->prepare($sql);

$priority = "IMPORTANT"; // TODO set value
$query->bindValue (':user_id', $idUser);
$query->bindValue(":card_id", $cardId);
$query->bindValue(":value", $upVote ? "+1" : "-1");

$ret = $query->execute();

$result = array(
    "code" => "",
    "content" => "");

if ($ret != 0) {
    $result["code"] = 500;
    $result["content"] = "Error while adding a card";
    echo json_encode($result);
    exit(1);
}

$result["code"] = 200;
$result["content"] = "Ok";

echo json_encode($result);
