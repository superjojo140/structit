<?php
require("../user/userSystem.php");
checkIfLoggedIn("false");
require("dbconnect.php");
    
$userId = $_SESSION["userId"]; 

 $data = $_POST['getData'];

$projectId = $data[0];
$text = $data[1];


    $sql="UPDATE structit SET text='$text' WHERE id='$projectId';";
    mysqli_query($db,$sql);

    echo "Änderungen gespeichert";
    
?>