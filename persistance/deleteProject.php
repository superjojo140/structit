<?php
require("../user/userSystem.php");
checkIfLoggedIn("false");
require("dbconnect.php");
    
$userId = $_SESSION["userId"]; 

$data = $_POST['getData'];

$projectId = $data[0];


    $sql="DELETE FROM structit WHERE id='$projectId';";
    mysqli_query($db,$sql);
    
?>