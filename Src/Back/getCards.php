<?php 
header("Access-Control-Allow-Origin: *");
session_start();

require_once("functions.php");
$pdo = getConnection();

$startId = $_GET["startId"];
$length = $_GET["length"];

$sql = "select * from Card";

$query = $pdo->prepare($sql);
$ret = $query->execute();

$result = array(
    "code" => "",
    "content" => "");

while ($row = $query->fetch()) {
    $cards[] = array(
        "id_card" => $row["id_card"],
        "description" => $row["description"],
        "title" => $row["title"],
        "date" => $row["date"],
        "priority" => $row["priority"],
        "value" => $row["value"],
        "user_id" => $row["user_id"]
    );
}

function usortTest($a, $b) {
    $date = new DateTime();
    $date2 = new DateTime($a["date"]);
    $interval = $date->diff($date2);
    $ecartA = $interval->format('%a');

    $date2 = new DateTime($b["date"]);
    $interval = $date->diff($date2);
    $ecartB = $interval->format('%a');

    return 10 - ( $a["priority"] * ($ecartA -$ecartB) + $a["value"]);
}

usort($cards, "usortTest");

$result["code"] = 200;
$result["content"] = $cards;

echo json_encode($result);
