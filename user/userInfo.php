<?php
require("user/userSystem.php");
checkIfLoggedIn("false");
include('../persistance/dbconnect.php');
//session_start();

if (isset($_SESSION["userId"])){
    $state = "loggedIn";
}
else{
    $state = "stranger";
}

$toReturn = array("state" => $state, "userId" => $_SESSION["userId"], "userName" => $_SESSION["userName"], "admin" => $_SESSION["admin"]);

echo json_encode($toReturn);

?>