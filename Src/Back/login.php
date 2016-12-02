<?php 
header("Access-Control-Allow-Origin: *");
session_start();

$result = array(
    "code" => "",
    "content" => "");

require_once("functions.php");
$pdo = getConnection();

$username = $_POST["username"];
$password = $_POST["pwd"];

$sql = "SELECT id_user from Users where username=:username and pwd=:password";
$query = $pdo->prepare($sql);
$query->bindValue (':username', $username);
$query->bindValue(":password", $password);
$ret = $query->execute();
$row = $query->fetch();

if ($row == false) {
    $result["code"] = 401;
    $result["content"] = "Bad credentials";
    echo json_encode($result);
    exit(1);
}

$idUser = $row["id_user"];

$result["code"] = 200;
$result["content"] = "Ok";

$_SESSION["login"] = $idUser;
echo json_encode($result);
