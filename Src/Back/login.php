<?php 
session_start();

$result = array(
    "code" => "",
    "content" => "");

require_once("functions.php");
$pdo = getConnection();

$username = $_GET["username"];
$password = $_GET["pwd"];

$sql = "SELECT id_user from Users where username=:username and pwd=:password";
$query = $pdo->prepare($sql);
$query->bindValue (':username', $username);
$query->bindValue(":password", $password);
$ret = $query->execute();

if ($ret != 0 ) {
    $result["code"] = 401;
    $result["content"] = "Bad credentials";
    echo json_encode($result);
    exit(1);
}

$row = $query->fetch();
$idUser = $row["id_user"];

$result["code"] = 200;
$result["content"] = "Ok";

$_SESSION["login"] = $idUser;
echo json_encode($result);