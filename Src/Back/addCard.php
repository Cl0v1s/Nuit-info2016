<?php 
session_start();

require_once("functions.php");
$pdo = getConnection();

$title = $_GET["title"];
$link = $_GET["link"];
$text = $_GET["text"];

if (!isset($_SESSION["login"])) {
    $result["code"] = 401;
    $result["content"] = "You're not logged in";
    echo json_encode($result);
    exit(1);
}

$idUser = $_SESSION["login"];

if (empty($link)) {
    $description = $text;
} else {
    $description = getTextFromLink($link);
}

$sql = "insert into Card(title,description,value,priority,date) values(:title, :description, :priority, NOW())";
$query = $pdo->prepare($sql);

$priority = "IMPORTANT"; // TODO set value
$query->bindValue (':title', $title);
$query->bindValue(":description", $description);
$query->bindValue(":priority", $priority);

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

$idCard = $query->lastInsertId();

$result["code"] = 200;
$result["content"] = $idCard;

echo json_encode($result);
