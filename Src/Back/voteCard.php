<?php 
header("Access-Control-Allow-Origin: *");
session_start();

$result = array(
    "code" => "",
    "content" => "");

require_once("functions.php");
$pdo = getConnection();

$cardId = $_GET["cardId"];
$upVote = $_GET["upVote"];

$upVote = $upVote == "true" ? true : false;

if (auth() === false) {
    $result["code"] = 401;
    $result["content"] = "You're not logged in";
    echo json_encode($result);
    exit(1);
}

$idUser = auth();

$sql="SELECT * FROM Vote WHERE card_id=:idC AND user_id=:idU";
$query = $pdo->prepare($sql);
$query->bindValue (':idU', $idUser);
$query->bindValue(":idC", $cardId);
$ret = $query->execute();
$row = $query->fetch();

if ($row != false) {
    // Results exists, user can't vote more than once'
    $result["code"] = 403;
    $result["content"] = "Vote already submitted";
    echo json_encode($result);
    exit(1);
}

$sql="INSERT INTO Vote (card_id, user_id, vote) VALUES( :idC, :idU, :v)";
$query = $pdo->prepare($sql);
$query->bindValue (':idU', $idUser);
$query->bindValue(":idC", $cardId);
$query->bindValue(":v", $upVote ? "1" : "-1");
$ret = $query->execute();

$sql = "update Card set value=value+:value where user_id=:user_id AND id_card=:card_id";
$query = $pdo->prepare($sql);
$priority = "IMPORTANT"; // TODO set value
$query->bindValue (':user_id', $idUser);
$query->bindValue(":card_id", $cardId);
$query->bindValue(":value", $upVote ? "1" : "-1");
$ret = $query->execute();

if ($ret != true) {
    $result["code"] = 500;
    $result["content"] = "Error while adding a card";
    echo json_encode($result);
    exit(1);
}

$result["code"] = 200;
$result["content"] = "Ok";

echo json_encode($result);