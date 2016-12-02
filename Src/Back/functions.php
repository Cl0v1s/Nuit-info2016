<?php

define("USER", "root");
define("PWD", "charibou");
define("HOST", "localhost");
define("DBNAME", "Reddifugge");

function getConnection() {
    
    try {
        $strConnection = "mysql:host=" . HOST . "; dbname=" . DBNAME;
        $arrExtraParam= array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $pdo = new PDO($strConnection, USER, PWD, $arrExtraParam);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
        $msg = 'PDO ERROR ' . $e->getFile() . ' L.' . $e->getLine() . ' : ' . $e->getMessage();
        die($msg);
    }
    
    return $pdo;
}

function query($pdo, $sql, $data = array()) {
    $req = $pdo->prepare($sql);
    $req->execute($data);
    return ($req->fetchAll(PDO::FETCH_OBJ));   //PDO::FETCH_ASSOC
}

function insert($pdo, $sql, $data = array()) {
    $req = $pdo->prepare($sql);
    $req->execute($data);
}

function getTextFromLink($url) {
    $html = file_get_contents($url);
    libxml_use_internal_errors(true); //Prevents Warnings, remove if desired
    $dom = new DOMDocument();
    $dom->loadHTML($html);
    $body = "";
    foreach($dom->getElementsByTagName("body")->item(0)->childNodes as $child) {
        $body .= $dom->saveHTML($child);
    }
    return $body;
}