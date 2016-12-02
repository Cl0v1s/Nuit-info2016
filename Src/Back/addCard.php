<?php 
header("Access-Control-Allow-Origin: *");
session_start();

require_once("functions.php");
$pdo = getConnection();

$title = $_GET["title"];
$link = $_GET["link"];
$text = $_GET["text"];

$result = array(
    "code" => "",
    "content" => "");

if (!auth()) {
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

$sql = "insert into Card(title,description,priority,date) values(:title, :description, :priority, NOW())";
$query = $pdo->prepare($sql);

$priority = "IMPORTANT"; // TODO set value
$query->bindValue (':title', $title);
$query->bindValue(":description", $description);
$query->bindValue(":priority", $priority);
$ret = $query->execute();

if ($ret != true) {
    $result["code"] = 500;
    $result["content"] = "Error while adding a card";
    echo json_encode($result);
    exit(1);
}

$idCard = PDO::lastInsertId();

$result["code"] = 200;
$result["content"] = $idCard;

echo json_encode($result);
